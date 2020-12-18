#!/usr/bin/python
import time
from math import floor
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('challs.xmas.htsp.ro', 6053))

time_start = time.time()

def multiply_matrix(X, Y, N):
	result = [[0 for i in xrange(N)] for j in xrange(N)]
	for i in xrange(len(X)):
	   for j in xrange(len(Y[0])):
	       for k in xrange(len(Y)):
	       	   # Answer needs to modulo 666013 or else it will overflow
	           result[i][j] = (result[i][j] + X[i][k] * Y[k][j])%666013
	return result

def exp_matrix(M, k, N):
    if(k == 1): 
     	return M
    else:
    	P = exp_matrix(M, floor(k/2), N)
    	if (k%2==0):
    		return multiply_matrix(P, P, N)
    	else:
    		return multiply_matrix(P, multiply_matrix(P, M, N), N)

def solve(M, k, N):
	A = exp_matrix(M, k, N)
	count = str(A[0][N-1])
	print "Answer: " + count
	return count+"\n"

def parse(data):
	N = int(data[0].split(' = ')[1])
	k = int(data[-1].split(' = ')[1])
	M = data[2:-2]
	M = map(lambda l: l.split(','), data[2:-2])
	for i in xrange(N):
		for j in xrange(N):
			M[i][j] = int(M[i][j])
	return solve(M, k, N)

data = s.recv(1024)
print data
for i in xrange(41):
	buf = ""
	while True:
		data = s.recv(4096)
		buf += data
		if (len(buf) > 0 and buf.split("\n")[-2] == ''):
			break
	print buf
	if i == 0:
		data = buf.split("\n")[1:-2]
	else:
		data = buf.split("\n")[2:-2]
	payload = parse(data)
	s.send(payload.encode("utf-8"))

print time.time() - time_start