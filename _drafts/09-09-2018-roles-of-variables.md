---
layout: post
title: Teaching the roles of variables
categories: ['teaching']
desc: Teaching novice developers roles of variables (single-variable design
      patterns) can help them understand how to program and give them the
      vocabulary to internalize why.
---

I've been reading [Teaching Tech Together](teachtogether.tech/en), which is
responsible for bringing a taxonomy of [the roles of
variables](http://saja.kapsi.fi/var_roles/index.html) to my attention.

I love this so much. Probably because I like seeing patterns in things and I
*especially* love naming those patterns.

(more stuff here)

- Fixed value: A variable whose value doesn't change
- Stepper: A variable that steps through a predictable sequence of values
- Most-recent-holder: A variable that's set to the latest value obtained in a
  program
- Most-wanted-holder: A variable that's set to the value that we want at the end
  of the program (or function)
- Gatherer: A variable that accumulates other values (a sum, a list of values)
- Follower: A variable that gets its values from the previous value of another
  variable
- One-way flag: Kind of like a toggle, except once the flip is switched, it can
  never go back (most likely a boolean)
- Temporary: ...a temporary variable
- Organizer: A collection of values that can be rearranged (ordered)
- Container: A collection of values that can be added and removed
  (stacks/queues)
- Walker: A variable that helps with traversing in a data structure

