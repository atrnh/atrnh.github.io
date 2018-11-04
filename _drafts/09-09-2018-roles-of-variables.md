---
layout: post
title: Roles of variables in teaching
categories: ['teaching']
excerpt_separator: <!--more-->
---

I've been reading [Teaching Tech Together](teachtogether.tech/en), which has
been responsible for bringing a taxonomy of [the roles of
variables](http://saja.kapsi.fi/var_roles/index.html) to my attention.

It's a list of single-variable design patterns. I can see this being
particularly useful to students when they're preparing for technical interviews
and starting to think more critically about algorithm design.

<!--more-->

## The roles of variables

Here's a reproduced list of those single-variable design patterns, with less
formal language and examples in Python.

### Fixed value

A variable whose value doesn't change, especially because you're relying on the
fact that its value is stable throughout an algorithm.

For example, `prices` (below) is used to store the prices of items on a menu.

```python
prices = {
    "coffee": 3.50,
    "sandwich": 7.00
}

total = sum([prices[item] for item in order])
```

It would be bad if `prices` was reassigned somewhere in the middle of the
program.

### Stepper

A variable that steps through a predictable sequence of values.

Here's a common use-case for a stepper variable:

```python
for i in range(len(items)):
    print(items[i])
```

### Most-recent-holder

A variable that's set to the latest value obtained in a program.

For instance, while traversing a linked list:

```python
current = llist.head
while current.next:
    current = current.next
```

`current` points to the node we're at *right now*.

### Most-wanted-holder

A variable that's set to the value that we're searching for.

In this loop, we set `maximum` to the larger value. By the end of the
loop, `maximum` will be the largest value in `nums`.

```python
maximum = nums[0]
for n in nums[1:]:
    if maximum < n:
        maximum = n
```

### Gatherer

A variable that accumulates other values.

```python
uppercased = [command.upper() for command in commands]
```

### Follower

A variable that gets its values from the previous value of another variable.

### One-way flag

Kind of like a toggle, except once the flip is switched, it can never go back
(most likely set to a boolean value).

```python
is_valid = True
for n in nums:
    if n > 100:
        is_valid = False
        break
```

### Temporary

A temporary variable.

In this example, we use `temp` to store the value at `nums[0]`, since it will be
overwritten when we swap `nums[0]` and `nums[1]`:

```python
temp = nums[0]
nums[0] = nums[1]
nums[1] = temp

# In Python, you can swap values without a temp variable in one line:
# nums[0], nums[1] = nums[1], nums[0]
```

- Organizer: A collection of values that can be rearranged (ordered)

- Container: A collection of values that can be added and removed
  (stacks/queues)

### Walker

A variable that helps with traversing a data structure.

