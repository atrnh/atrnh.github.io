---
layout: post
title: Self-referential lists in Python
categories: ['python']
excerpt_separator: <!--more-->
---

Let's say you need to rotate a list but you don't want to bother doing tedious
arithmetic on indices. Try this instead:

```python
>>> a = [1, 2]
>>> a.append(a)
>>> a[-1]
[1, 2, [...]]
>>> a[-1][-1][-1][-1]  # ...etc.
[1, 2, [...]]
```

...but that only gets us partway there.

<!--more-->

- We don't want ``a[-1]`` to be ``[1, 2, [...]]``
- We want it to point to ``a[0]`` (which evaluates to ``1``)

What we *really* want to do is to create a sort-of linked list by somehow
appending a reference to the *beginning* of ``a``... but we're lazy.

We need some way to flatten the list. Except we can't flatten the list *because
the list has an infinite amount of lists in it*.

Instead, we'll write a generator that takes a self-referential list and
*behaves* like a circular linked list:

```python
def circular_generator(infinite_list):
    try:
        for x in infinite_list:
            yield from next_item(x)
    except:
        yield infinite_list
```

```python
>>> g = circular_generator(a)
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

rotated = circular_generator(rotary_alphabet)

decipherer = {                       # {'a': 'd', 'b': 'e', ...}
    plainchar: next(rotated)
    for plainchar in plain_alphabet
}
```
