let k =
  "REDACTED0000MTE1fDM3fDUzfDY2fDM3fDUzfDY4fDk3fDM3fDUzfDY2fDM3fDUzfDY4fDExMHwzN3w1M3w2NnwzN3w1M3w2OHwxMTZ8Mzd8NTN8NjZ8Mzd8NTN8Njh8OTd8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTIyfDM3fDUzfDY2fDM3fDUzfDY4fDExOXwzN3w1M3w2NnwzN3w1M3w2OHwxMDV8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE1fDM3fDUzfDY2fDM3fDUzfDY4fDEwNHwzN3w1M3w2NnwzN3w1M3w2OHwxMDF8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE1fDM3fDUzfDY2fDM3fDUzfDY4fDEyMnwzN3w1M3w2NnwzN3w1M3w2OHwxMjF8Mzd8NTN8NjZ8Mzd8NTN8Njh8NDh8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE3fDM3fDUzfDY2fDM3fDUzfDY4fDEyMnwzN3w1M3w2NnwzN3w1M3w2OHw5OXwzN3w1M3w2NnwzN3w1M3w2OHwxMTR8Mzd8NTN8NjZ8Mzd8NTN8Njh8OTd8Mzd8NTN8NjZ8Mzd8NTN8Njh8OTl8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTA1fDM3fDUzfDY2fDM3fDUzfDY4fDExN3wzN3w1M3w2NnwzN3w1M3w2OHwxMTB8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTIyfDM3fDUzfDY2fDM3fDUzfDY4fDEwMnwzN3w1M3w2NnwzN3w1M3w2OHwxMDF8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE0fDM3fDUzfDY2fDM3fDUzfDY4fDEwNXwzN3w1M3w2NnwzN3w1M3w2OHw5OXwzN3w1M3w2NnwzN3w1M3w2OHwxMDV8Mzd8NTN8NjZ8Mzd8NTN8Njh8MTE2";

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

console.log(unbobify(k));
