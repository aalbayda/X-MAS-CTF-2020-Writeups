# X-Mas 2020: Santa's consolation


## Problem
**Category:** Web
> Santa's been sending his regards; he would like to know who will still want to hack stuff after his CTF is over.     
> Note: Bluuk is a multilingual bug bounty platform that will launch soon and we've prepared a challenge for you. Subscribe and stay tuned!
> 
> Target: [https://bluuk.io](https://bluuk.io)     
> PS: The subscription form is not the target :P     

The website is designed to look like SQL injection grounds but as the description says, the shady form is irrelevant. What's relevant is the big red button that says "Let's Hack".

![enter image description here](https://i.imgur.com/TQsXQK8.png)


Clicking it loads `challenge.js`:

![enter image description here](https://i.imgur.com/cSwyvnt.png)

## Breakdown

Let's break the script down.

To get the flag, I need a string that makes `check` return `true`.


```
function win(x) {
  return check(x) ? "X-MAS{" + x + "}" : "[REDACTED]";
}
```

And inside `check`:
```
function check(s) {
  const k =
    "MkVUTThoak44TlROOGR6TThaak44TlROOGR6TThWRE14d0hPMnczTTF3M056d25OMnczTTF3M056d1hPNXdITzJ3M00xdzNOenduTjJ3M00xdzNOendYTndFRGY0WURmelVEZjNNRGYyWURmelVEZjNNRGYwRVRNOGhqTjhOVE44ZHpNOFpqTjhOVE44ZHpNOEZETXh3SE8ydzNNMXczTnp3bk4ydzNNMXczTnp3bk13RURmNFlEZnpVRGYzTURmMllEZnpVRGYzTURmeUlUTThoak44TlROOGR6TThaak44TlROOGR6TThCVE14d0hPMnczTTF3M056d25OMnczTTF3M056dzNOeEVEZjRZRGZ6VURmM01EZjJZRGZ6VURmM01EZjFBVE04aGpOOE5UTjhkek04WmpOOE5UTjhkek04bFRPOGhqTjhOVE44ZHpNOFpqTjhOVE44ZHpNOGRUTzhoak44TlROOGR6TThaak44TlROOGR6TThSVE14d0hPMnczTTF3M056d25OMnczTTF3M056d1hPNXdITzJ3M00xdzNOenduTjJ3M00xdzNOenduTXlFRGY0WURmelVEZjNNRGYyWURmelVEZjNNRGYzRVRNOGhqTjhOVE44ZHpNOFpqTjhOVE44ZHpNOGhETjhoak44TlROOGR6TThaak44TlROOGR6TThGak14d0hPMnczTTF3M056d25OMnczTTF3M056d25NeUVEZjRZRGZ6VURmM01EZjJZRGZ6VURmM01EZjFFVE04aGpOOE5UTjhkek04WmpOOE5UTjhkek04RkRNeHdITzJ3M00xdzNOenduTjJ3M00xdzNOendITndFRGY0WURmelVEZjNNRGYyWURmelVEZjNNRGYxRVRNOGhqTjhOVE44ZHpNOFpqTjhOVE44ZHpNOFZETXh3SE8ydzNNMXczTnp3bk4ydzNNMXczTnp3WE94RURmNFlEZnpVRGYzTURmMllEZnpVRGYzTURmeUlUTThoak44TlROOGR6TThaak44TlROOGR6TThkVE84aGpOOE5UTjhkek04WmpOOE5UTjhkek04WlRNeHdITzJ3M00xdzNOenduTjJ3M00xdzNOendITXhFRGY0WURmelVEZjNNRGYyWURmelVEZjNNRGYza0RmNFlEZnpVRGYzTURmMllEZnpVRGYzTURmMUVUTTAwMDBERVRDQURFUg==";
  const k1 = atob(k)
    .split("")
    .reverse()
    .join("");
  return bobify(s) === k1;
}
```
`k1` evaluates as:
```
"REDACTED0000MTE1fDM3fDUzfDY2fDM3fDUzfDY4fDk3fDM3fDUzfDY2fDM3fDUzfDY4fDExMHwzN3w1M3w2NnwzN3w1M3w2OHwxMTZ8Mzd8NTN8NjZ8Mzd8NTN8Njh8OTd8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTIyfDM3fDUzfDY2fDM3fDUzfDY4fDExOXwzN3w1M3w2NnwzN3w1M3w2OHwxMDV8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE1fDM3fDUzfDY2fDM3fDUzfDY4fDEwNHwzN3w1M3w2NnwzN3w1M3w2OHwxMDF8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE1fDM3fDUzfDY2fDM3fDUzfDY4fDEyMnwzN3w1M3w2NnwzN3w1M3w2OHwxMjF8Mzd8NTN8NjZ8Mzd8NTN8Njh8NDh8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE3fDM3fDUzfDY2fDM3fDUzfDY4fDEyMnwzN3w1M3w2NnwzN3w1M3w2OHw5OXwzN3w1M3w2NnwzN3w1M3w2OHwxMTR8Mzd8NTN8NjZ8Mzd8NTN8Njh8OTd8Mzd8NTN8NjZ8Mzd8NTN8Njh8OTl8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTA1fDM3fDUzfDY2fDM3fDUzfDY4fDExN3wzN3w1M3w2NnwzN3w1M3w2OHwxMTB8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTIyfDM3fDUzfDY2fDM3fDUzfDY4fDEwMnwzN3w1M3w2NnwzN3w1M3w2OHwxMDF8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE0fDM3fDUzfDY2fDM3fDUzfDY4fDEwNXwzN3w1M3w2NnwzN3w1M3w2OHw5OXwzN3w1M3w2NnwzN3w1M3w2OHwxMDV8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE2"
```

That string `s`, when "bobified", must equal `k1` to return `true`. So to find `s`, I need to "unbobify" `k1`.  To do that I'll need to unpack and reverse each line of `bobify()`.

## Reversing
This is the `bobify` function:
```
function bobify(s) {
  if (
    ~s.indexOf("a") ||
    ~s.indexOf("t") ||
    ~s.indexOf("e") ||
    ~s.indexOf("i") ||
    ~s.indexOf("z")
  )
    return "[REDACTED]";
  const s1 = s
    .replace(/4/g, "a")
    .replace(/3/g, "e")
    .replace(/1/g, "i")
    .replace(/7/g, "t")
    .replace(/_/g, "z")
    .split("")
    .join("[]");
  const s2 = encodeURI(s1)
    .split("")
    .map(c => c.charCodeAt(0))
    .join("|");
  const s3 = btoa("D@\xc0\t1\x03\xd3M4" + s2);
  return s3;
}
```
Inside a new `unbobify(k)` I reverse each line of `bobify(s)` from the bottom up.

**Line 1**

```
const s3 = btoa("D@\xc0\t1\x03\xd3M4" + s2);
```
becomes:
```
const s1 = atob(k).replace("D@\xc0\t1\x03\xd3M4", "");
```
**Line 2**
```
const s2 = encodeURI(s1)
.split("")
.map(c => c.charCodeAt(0))
.join("|");
  ```
becomes
```
const s2 = decodeURI(
    s1
      .split("|")
      .map(c => String.fromCharCode(c))
      .join("")
  );
```
**Line 3**
```
const s1 = s
	.replace(/4/g, "a")
	.replace(/3/g, "e")
	.replace(/1/g, "i")
	.replace(/7/g, "t")
	.replace(/_/g, "z")
	.split("")
	.join("[]");
```
becomes
```
const s3 = s2
	.split("[]")
	.join("")
	.replace(/z/g, "_")
	.replace(/t/g, "7")
	.replace(/i/g, "1")
	.replace(/e/g, "3")
	.replace(/a/g, "4");
```

### Putting things together

```
function unbobify(k) {
  const s1 = atob(k).replace("D@\xc0\t1\x03\xd3M4", "");
  const s2 = decodeURI(
    s1
      .split("|")
      .map(c => String.fromCharCode(c))
      .join("")
  );
  const s3 = s2
    .split("[]")
    .join("")
    .replace(/z/g, "_")
    .replace(/t/g, "7")
    .replace(/i/g, "1")
    .replace(/e/g, "3")
    .replace(/a/g, "4"); 
  return s3;
}
```

## Flag
![enter image description here](https://i.imgur.com/1pRlzXV.png)![enter image description here](https://i.imgur.com/oY2UqQm.png)
