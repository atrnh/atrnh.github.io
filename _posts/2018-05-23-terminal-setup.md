---
layout: page 
title: 'Tutorial: My cmd prompt'
subtitle: 'How to make your command line prompt look really cute'
tags: tutorial
parent:
    title: Tutorials
    url: /tutorials/
---

<div class="page-image">
  <div class="alert alert-info">
    <img src="/assets/cmd.png">
    The 🌙 is an AM/PM indicator. AM is ⛅.
  </div>
</div>

Maybe you've seen my command line prompt and you really want to know how I got
it.

### Step 1: Install oh-my-zsh

Oh My Zsh is a zsh configuration manager. Basically, it helps you install
plugins (handy tools!) and themes (pretty command line prompts!) for your shell.

Follow the instructions in the README and pick a theme that you like.

You can be happy with what you've got now, or you can keep reading for how you
can customize your prompt even *further*.

### Step 2: Investigate .zsh-theme

Unless you've installed some other theme, your theme's source code should be
sitting in `~/.oh-my-zsh/themes`.

Find the theme you installed in there. For instance, if you chose *agnoster*,
then its source file is `~/.oh-my-zsh/themes/agnoster.zsh-themes`.
