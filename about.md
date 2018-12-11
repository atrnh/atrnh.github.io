---
layout: page
title: About
permalink: /about/
mainMenu: true
---

## Tools

Click an annotation for details & download links.

{% include tools-screenshot.html %}

### Ubersicht

- [Download/install](http://tracesof.net/uebersicht/)
- I'm using my own widget, which I haven't put on GitHub yet

Ubersicht creates a webview on your desktop, which means you can write and
customize widgets in bash, CoffeeScript, CSS, and HTML.

### Spaceship AM/PM

- [GitHub](https://github.com/atrnh/spaceship-prompt)
- [Installation instructions](https://github.com/denysdovhan/spaceship-prompt/blob/master/README.md)

My fork of Spaceship, a super-customizable zsh theme. I just added the option to
use emojis as AM/PM indicators.

The overrides I use (put these in your `.zshrc`):

```zsh
SPACESHIP_CHAR_SYMBOL="♥"
SPACESHIP_CHAR_SUFFIX=" "
SPACESHIP_CHAR_COLOR_SUCCESS="13"

SPACESHIP_VENV_PREFIX="🦑 "
SPACESHIP_BATTERY_SHOW="true"
SPACESHIP_BATTER_PREFIX="↯ "

SPACESHIP_TIME_SHOW="true"
SPACESHIP_TIME_COLOR="14"
SPACESHIP_TIME_12HR="true"
SPACESHIP_TIME_FORMAT="%D{{ "{%" }}-I:%M}"
SPACESHIP_TIME_SUFFIX=" "
SPACESHIP_TIME_AMPM_SHOW=true

SPACESHIP_DIR_PREFIX="🌟 "
SPACESHIP_DIR_COLOR="5"

SPACESHIP_EXEC_TIME_SUFFIX=" 🔮"
```

### Chunkwm

- [GitHub](https://github.com/koekeishiya/chunkwm)
- [Installation instructions](https://koekeishiya.github.io/chunkwm/docs/userguide.html)

I use this tiling windows manager with khd for keyboard shortcuts. I wrote a
quick guide on using khd
[here](/tools/2018/07/19/modal-keyboard-shortcuts.html).

### Neovim

- [Neovim](https://neovim.io/)

One day I'll make a list of my essential plugins. For now, you can find them in
my [.vimrc](https://github.com/atrnh/.dotfiles/blob/master/.vimrc).

### Kitty

- [Kitty](https://sw.kovidgoyal.net/kitty/)
- **Font:** [Fira Code](https://github.com/tonsky/FiraCode)
