import json
import math
import sys
import numpy as np
from scipy.io import wavfile
from scipy.fftpack import fft
from tqdm import tqdm

# Help message
print('Usage: prepare.py source_file window_size_milliseconds bit_depth bins\n\n')

# Application CLI arguments
_, source, window_size_milliseconds, bit_depth, bin_count = sys.argv
window_size_milliseconds = float(window_size_milliseconds)
bit_depth = int(bit_depth)
bin_count = int(bin_count)

# Warning
if not source.endswith('.wav'):
  raise ValueError('This program can only work with WAV files.')

# Read
source_sample_rate, audio = wavfile.read(source)
samples_per_window = source_sample_rate * window_size_milliseconds / 1000
total_window_count = int(len(audio) // samples_per_window)

# Use average of both the channels.
if len(audio.shape) != 1:
  audio = audio.sum(axis=1) / len(audio.shape)

# Results
result_bins = []
max_amplitude = -math.inf

# Process
for window_index in tqdm(range(total_window_count)):
  slice_starts = int( window_index * samples_per_window)
  slice_ends = int(slice_starts + samples_per_window)
  audio_slice = audio[slice_starts:slice_ends]

  # Normalize the slice
  normalized_audio_slice = [
    (sample / 2 ** (bit_depth - 1)) - 1
    for sample in audio_slice
  ]

  # Generate the transformation
  transform = fft(normalized_audio_slice, 22000)

  # Bin the Transformation
  slice_bins = []
  min_frequency = 0
  max_frequency = 800
  frequency_range = max_frequency - min_frequency
  bin_frequency_range = frequency_range // bin_count

  for bin_starts in range(0, 800, bin_frequency_range):
    bin_ends = int(bin_starts + bin_frequency_range)
    transform_slice = transform[bin_starts:bin_ends]
    slice_bins.append(sum(transform_slice) / bin_frequency_range)

  slice_bins = np.array(slice_bins)
  slice_bins = np.absolute(slice_bins)
  slice_bins = slice_bins.tolist()
  result_bins.append(slice_bins)

  max_amplitude_local = max(slice_bins)
  if max_amplitude_local > max_amplitude:
    max_amplitude = max_amplitude_local

# Scale all the amplitudes
for bin in result_bins:
  for index in range(len(bin)):
    bin[index] = math.log2(bin[index])

# Export the result
with open(f'{source}.json', 'w') as export:
  json.dump({
    'duration_per_sample': window_size_milliseconds / 1000,
    'bin_count': bin_count,
    'bins': result_bins,
  }, export)
