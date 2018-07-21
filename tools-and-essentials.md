---
layout: page
title: Tools & Essentials
permalink: /my-setup/
---

Click an annotation for details & download links.

{% include tools-screenshot.html %}

## Ubersicht

- [Download/install](http://tracesof.net/uebersicht/)
- I'm using my own widget, which I haven't put on GitHub yet

Ubersicht creates a webview on your desktop, which means you can write and
customize widgets in bash, CoffeeScript, CSS, and HTML.

## Spaceship AM/PM

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
