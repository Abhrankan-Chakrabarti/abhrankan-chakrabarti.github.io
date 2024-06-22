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
Catalan numbers are a sequence of natural numbers that have many applications in combinatorial mathematics. They can be defined using the recurrence relation:

![relation](https://latex.codecogs.com/svg.latex?C_n%20%3D%20%5Cfrac%7B2%282n%20-%201%29%7D%7Bn%20%2B%201%7D%20C_%7Bn%20-%201%7D)
with ![C_0 = 1](https://latex.codecogs.com/svg.latex?C_0%20%3D%201).

## The Algorithm
### Series Representation
The series representation for π used in this algorithm is derived from the inverse sine function:

![\pi = 6 arcsin(0.5)](https://latex.codecogs.com/svg.latex?%5Cpi%20%3D%206%20%5Carcsin%280.5%29)

By expanding ![arcsin(0.5)](https://latex.codecogs.com/svg.latex?%5Carcsin%280.5%29) as a series, we get:

![series](https://latex.codecogs.com/svg.latex?%5Carcsin%28x%29%20%3D%20%5Csum_%7Bn%3D0%7D%5E%7B%5Cinfty%7D%20%5Cfrac%7B%282n%29%21%7D%7B4%5En%20%28n%21%29%5E2%20%282n%20%2B%201%29%7D%20x%5E%7B2n%20%2B%201%7D)

Substituting ![x = 0.5](https://latex.codecogs.com/svg.latex?x%20%3D%200.5) and multiplying by 6, we derive the series:

![series](https://latex.codecogs.com/svg.latex?%5Cpi%20%3D%203%20%2B%206%20%5Csum_%7Bn%3D1%7D%5E%7B%5Cinfty%7D%20%5Cfrac%7B%282n%20-%201%29%20%5Ccdot%20C_%7Bn-1%7D%7D%7B%282n%20%2B%201%29%20%5Ccdot%2016%5En%7D)

Where ![C_n](https://latex.codecogs.com/svg.latex?C_n) is the nth Catalan number.

### Optimization
To enhance computational efficiency, we take the LCM of all terms in the series, add them, and perform one long division at the end. This reduces the number of divisions required during the calculation, making the algorithm more efficient.

### Implementation
The implementation in Python leverages the `gmpy2` library for high-precision arithmetic. Here is the code:

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
This code takes advantage of the optimization by performing one long division at the end, after taking the LCM of all terms in the series.

## Conclusion
This new approach to calculating the digits of π is both efficient and intriguing due to its use of Catalan numbers. Further optimization and analysis could lead to even more efficient algorithms.

## Further Reading
- [Catalan Numbers](https://en.wikipedia.org/wiki/Catalan_number)
- [Fixed-Point Arithmetic](https://en.wikipedia.org/wiki/Fixed-point_arithmetic)