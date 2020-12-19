# X-MAS 2020: Many Paths

## Problem
**Category**: Programming

After connecting to the port, we are introduced to the problem. I've bolded the most important parts.

> I swear that Santa is going crazy with those problems, this time we're
> really screwed! 
> The new problem asks us the following: 
> Given an **undirected graph of size N by its adjacency matrix** and a set of
> forbidden nodes, tell me **how many paths from node 1 to node N of
> exactly length L** that don't pass through any of the forbidden nodes
> exist (please note that **a node can be visited multiple times**)? 
> And if that wasn't enough, we need to answer 40 of those problems in **45  seconds** and to give each output modulo 666013. What does that even mean!?

We need to count the number of "paths" of length *L* between the first and last nodes in a graph. In fact the title is a misnomer - since we can revisit nodes we are technically looking for the number of *L*-length *walks*. We are also given the adjacency matrix *M* that represents the graph.

There are 40 test cases, each usually larger than the last, and they must all be solved within 45 seconds. I suspect the modulo requirement is to avoid overflow, because the numbers get really large.

## Theory

After almost an hour of research I come across this theorem:

![enter image description here](https://i.imgur.com/e2cpjdI.png)

Source: https://people.cs.clemson.edu/~goddard/handouts/math8540/adjacencyNotes.pdf. The proof is pretty interesting too.


So when we compute for *M*<sup>L</sup>, the answer is in in *M*<sup>L</sup><sub>[0]</sub><sub>[N-1]</sub>.

This is the most efficient solution I could find (and reasonably understand). Multiplication of two matrices costs *O(V<sup>3</sup>)*, and  [divide-and-conquer exponentiation](https://en.wikipedia.org/wiki/Exponentiation_by_squaring) costs *O(log<sub>2</sub>L)*. Thus the overall runtime of this solution is *O(V<sup>3</sup>\*log<sub>2</sub>L)*.

This is superior to alternatives like DP-, DFS-, and BFS-based solutions which max at *O(V<sup>2</sup>\*L)* runtime, This is important because *L* grows much faster as the graph gets larger. Even after exhausting code and compiler optimizations I could not get my DP solution to beat the time.

## Implementation

The code contains three broad things:

 - Matrix multiplication function that respects modulo requirement
 - Matrix exponentiation function that uses divide-and-conquer strategy
 - Socket that can read and send data

### Matrix multiplication
```
# Matrix X * Matrix Y
def multiply_matrix(X, Y, N):
	# Product matrix is also NxN
	result = [[0 for i in xrange(N)] for j in xrange(N)]
	for i in xrange(len(X)):
	   for j in xrange(len(Y[0])):
	       for k in xrange(len(Y)):
		   # Dot product
	           result[i][j] = (result[i][j] + X[i][k] * Y[k][j])%666013
	return result
```

### Matrix exponentiation
```
# M^L by logarithmic recursion
from math import floor
def exp_matrix(M, L, N):
    if(k == 1): 
     	return M
    else:
    	P = exp_matrix(M, floor(L/2), N)
    	if (L%2==0):
    		return multiply_matrix(P, P, N)
    	else:
    		return multiply_matrix(P, multiply_matrix(P, M, N), N)
```
### Socket
```
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('challs.xmas.htsp.ro', 6053))
```

### Main program
```
def solve(M, L, N):
	A = exp_matrix(M, L, N)
	count = str(A[0][N-1])
	print "Answer: " + count
	return count+"\n"

def parse(data):
	# Get number of nodes N
	N = int(data[0].split(' = ')[1])
	# Get length L
	L = int(data[-1].split(' = ')[1])
	M = map(lambda l: l.split(','), data[2:-2])
	for i in xrange(N):
		for j in xrange(N):
			M[i][j] = int(M[i][j])
	return solve(M, L, N)

data = s.recv(1024)
print data
for i in xrange(41):
	buf = ""
	while True:
		data = s.recv(4096)
		buf += data
		if len(buf) > 0 and buf.split("\n")[-2] == '':
			break
	print buf
	if i == 0:
		data = buf.split("\n")[1:-2]
	else:
		data = buf.split("\n")[2:-2]
	payload = parse(data)
	s.send(payload)
```

I ran this with [PyPy2.7](https://www.pypy.org/), which runs magnitudes faster than the standard Python interpreter.


## Flag
![enter image description here](https://i.imgur.com/UDZULaC.png)
