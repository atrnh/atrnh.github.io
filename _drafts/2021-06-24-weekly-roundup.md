---
date: 2021-06-24
title: "Weekly-ish Roundup #1"
summary: |
  *Weekly-ish Roundup* will be the place for me to share and recommend things I've been reading, building,
  using, doing, etc.! In this inaugural edition of *Weekly-ish Roundup*, I improve my dev workflow, play some
  games, and more...
---

This used to be called *Weekly Roundup #1* but I didn't want to commit to a regular posting
schedule 😅

I'll use *Weekly-ish Roundup* to dump recommendations, opinions, and reviews around things
I like. Think: [Cool Tools](https://kk.org/cooltools/) but more amateur. And without regularly
scheduled content. And much, *much* more infrequent.

# Stuff I built

## Interactively search (and checkout) Git branches with Peco

https://github.com/peco/peco

I used to be a devout, terminal-only elitist. My entire development workflow was driven by
CLIs and [Neovim](https://github.com/neovim/neovim). Last year I *finally* bit the bullet
and gave [VS Code](https://code.visualstudio.com/) a shot (thanks to a friend who
pointed me toward [VSCode
Neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim)).

Using VS Code for source control and GitHub stuff has made me realize *nice* GUIs can be
but there are still a couple things I still prefer to do via the command line.

```shell
function igco {
  git checkout $(git branch | peco)
}
```

## Advent of Code 2020

blah

# Stuff I played

- Gungeon
- Slime rancher
- ???