---
date: 2018-07-19
title: I can't live without my modal keyboard shortcut daemon
summary: How to set up and use **khd**.
---

I don't like taking my hands off my keyboard.

Keyboard shortcuts (combined with a tiling windows manager) are my bread and
butter. Most of my shortcuts help me manipulate or switch between open
windows/applications.

- **Problem:** I need a lot of shortcuts.
- **Problem:** I was tired of having to _get creative_ with my shortcuts
  (`cmd+r`, `cmd-shift+r`, `ctrl-cmd-shift+r`, etc...)
- **Solution:** [khd](https://github.com/koekeishiya/khd) — a modal hotkey daemon!

## Modal hotkey daemon??

Modal == modes

If you've ever used vim, you're already familiar with this idea:

- Each mode acts like a layer
- For example — in **_normal_** mode (vim), `hjkl` act like directional (arrow)
  keys; in **_insert_** mode, they go back to being regular text-input keys
- You activate and deactivate modes as needed

Probably the most important advantage (imo) of modal shortcuts is being able to
create multiple, mnemonic shortcuts _using the same keys_, without having to
combine/hold down ridiculous amounts of modifier keys.

## My modes

- **_Switcher_** — actions I do _a lot_ (switching focus between
  windows, activating my other modes)
- **_Window_** — actions on a window (resizing, toggling the window's tiling
  mode)
- **_Space_** — actions on a desktop/workspace (rotating layout, switching
  desktops)

## Installing & configuring khd

Documentation for writing a configuration file isn't beginner-friendly,
so here is the relative gist of it:

_(Sorry Windows users, khd is only for macOS)_

- [Installation instructions are here](https://github.com/koekeishiya/khd#install)
- Make a file called `.khdrc` in your home directory

### Decide on the names of your modes

Maybe write them down on a piece of paper, somewhere.

### Enable prefixes

Prefixes are great; instead of doing something like holding down `shift+ctrl-h`,
a prefix allows you to execute the prefix and _then_ tap the shortcut key.

For example, I can do `ctrl-f` and then tap `h` to switch focus to the window
on the left.

If I want to enable a prefix for my **_switcher_** mode:

```bash
khd mode switcher prefix on

# To specify how long khd should wait for the next keypress:
khd mode switcher timeout 0.30  # seconds
```

### Add shortcuts for activating a mode

To activate my **_switcher_** mode, I use `ctrl-f`:

```bash
ctrl - f : khd -e "mode activate switcher"
```

While I'm in **_switcher_**, I want shortcuts to activate my other modes:

```bash
switcher - w : khd -e "mode activate swap"
switcher - s : khd -e "mode activate space"
switcher - o : khd -e "mode activate window"
```

Since **_switcher_** is prefix-enabled, `switcher - w` means that I do `ctrl-f`
and then hit `w` to get into **_swap_** mode.

### Getting out of a mode

Once you have a mode enabled, you will remain in that mode unless you have a way
to get back to the **_default_** mode.

In my config, I have several ways to go back to **_default_** that cover
different use-cases:

```bash
# Go back to default if I do ctrl-f again (because that probably means that I
# changed my mind halfway through)
switcher + ctrl - f : khd -e "mode activate default"
swap + ctrl - f     : khd -e "mode activate default"
space + ctrl - f    : khd -e "mode activate default"
window + ctrl - f   : khd -e "mode activate default"

# Go back to default if I hit escape (I'm used to doing this in vim)
switcher - escape   : khd -e "mode activate default"
swap - escape       : khd -e "mode activate default"
space - escape      : khd -e "mode activate default"
window - escape     : khd -e "mode activate default"
```

### Everything else

Now you have modes that you can assign shortcuts to! Shortcuts are assigned to
shell commands.

Here's a shortcut I use to open a terminal window:

```bash
switcher - return  : open -na /Applications/kitty.app;\
                     khd -e "mode activate default"
```

## Syntax & etc.

Details on syntax can be found in the [official sample config](https://github.com/koekeishiya/khd/blob/master/examples/khdrc)

You can find my config in my [.dotfiles repository](https://github.com/atrnh/.dotfiles/blob/master/.khdrc)
