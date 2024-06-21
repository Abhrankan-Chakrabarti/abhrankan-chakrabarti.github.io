---
layout: post
title: "Calculating π with Catalan Numbers: A Novel Approach"
date: 2024-06-21
categories: mathematics algorithms
---

## Introduction
Calculating the digits of π has been a topic of interest for mathematicians and computer scientists alike. In this post, I introduce a novel algorithm for π calculation that leverages Catalan numbers and fixed-point arithmetic.

## Background
### History of π Calculation Methods
Historically, various methods have been used to approximate the digits of π, from Archimedes' method to the more recent Chudnovsky algorithm.

### Catalan Numbers
Catalan numbers are a sequence of natural numbers that have many applications in combinatorial mathematics.

## The Algorithm
### Series Representation
The series representation used in my algorithm is:

![equation](https://latex.codecogs.com/svg.latex?x%3D%5Cpi%20%3D%203%20%2B%206%20%5Csum_%7Bn%3D1%7D%5E%7B%5Cinfty%7D%20%5Cfrac%7B%282n%20-%201%29%20%5Ccdot%20C_n%7D%7B%282n%20%2B%201%29%20%5Ccdot%2016%5En%7D)

Where ![C_n](https://latex.codecogs.com/svg.latex?x%3DC_n) is the nth Catalan number.

### Implementation
Here is the Python code for the algorithm:

```python
from gmpy2 import mpz
import sys

# Input number of digits
digits = mpz(eval(input('How many digits of π? :\t')))
iters = digits * 5 // 3

# Initialize variables
pi = mpz()
c = d1 = d2 = m = mpz(1)

# Iterative calculation
for i in range(2, iters + 2):
    pi *= 16 * (m + 2)
    pi += c * m * d2
    c = 2 * c * m // i
    d1 *= 16
    m += 2
    d2 *= m
    if i % 1000 == 0:
        print("\r%d terms..." % i, end='')

# Final calculation
one = mpz(10) ** digits
pi = 6 * pi * one // (d1 * d2) + 3 * one
pi_digits = f'{pi // one}.' + str(pi % one).zfill(digits)

# Output result
if sys.argv[1:2] in (['-l'], ['--log']):
    with open((sys.argv[2:3] or [f'pi{digits}.txt'])[0], 'w') as f:
        f.write(pi_digits)
else:
    print(f'\rπ = {pi_digits}...∞')
```

### Explanation of the Code
The code iteratively calculates π using the fixed-point arithmetic method and Catalan numbers.

## Conclusion
This new approach to calculating the digits of π is both efficient and intriguing due to its use of Catalan numbers. Further optimization and analysis could lead to even more efficient algorithms.

## Further Reading
- [Catalan Numbers](https://en.wikipedia.org/wiki/Catalan_number)
- [Fixed-Point Arithmetic](https://en.wikipedia.org/wiki/Fixed-point_arithmetic)