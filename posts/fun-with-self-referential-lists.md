---
date: 2018-12-11
title: Fun with self-referential lists
summary: |
  Fun tricky things you can do after appending a list to itself.
---

Ah, the self-referential list:

```python
a = [1, 2]
a.append(a)

a[-1]  # => [1, 2, [...]]
```

The last item of `a` is a reference to `a`, so `a[-1]` is `a` and `a[-1][-1]` is
`a`, etc., etc.:

```python
a[-1]              # => [1, 2, [...]]
a[-1][-1]          # => [1, 2, [...]]
a[-1][-1][-1]      # => [1, 2, [...]]
a[-1][-1][-1][-1]  # => [1, 2, [...]]
```

Of course, you should never actually do this in real life but it's fun to think
of different ways to use a circular list. Especially because programming circular
things can be pretty annoying.

- We don't want `a[-1]` to be `[1, 2, [...]]`
- We want it to point to `a[0]` (which evaluates to `1`)

What we _really_ want to do is to create a sort-of linked list by somehow
appending a reference to the _beginning_ of `a`... but we're lazy.

We need some way to flatten the list. Except we can't flatten the list _because
the list has an infinite amount of lists in it_.

Instead, we'll write a generator that takes a self-referential list and
_behaves_ like a circular linked list:

```python
def circular_generator(infinite_list):
    for x in infinite_list:
        if isinstance(x, list):
            yield from circular_generator(x)
        yield x
```

```python
>>> g = next_item(a)
>>> next(g)
1
>>> next(g)
2
>>> next(g)
1
>>> # ...etc.
```

Here's an example using `circular_generator` to decipher messages encrypted
with the Caesar cipher:

```python
plain_alphabet = list('abcdefghijklmnopqrstuvwxyz')

rotary_alphabet = plain_alphabet[:]
rotary_alphabet.append(rotary_alphabet)

rotated = circular_generator(rotary_alphabet[3:])

decipherer = {                       # {'a': 'd', 'b': 'e', ...}
    plainchar: next(rotated)
    for plainchar in plain_alphabet
}
```

_Edit 3/7_: I had to fix the code in my `circular_generator` function because it
didn't work. At all. Whoops!

Also, you'll probably notice that we don't actually need a self-referential
list to accomplish any of this. I'll admit that this was an attempt to get
students to think about self-referential lists and imagine a possible, practical
application.

Here's the `circular_generator` function that takes in a normal list:

```python
def circular_generator(l):
    for x in l:
        yield x
    yield from circular_generator(l)
```
