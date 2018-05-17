"""Publish a terminal color scheme.

This script is very specific to the layout of atrnh.github.io, so proceed
with caution.
"""

from datetime import datetime
from textwrap import dedent
import re


COLOR_NAMES = [
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white'
]

SPECIAL_NAMES = ['fg', 'bg', 'cc']


def get_file_lines(filename):
    """Return list of lines in a file."""

    with open(filename) as f:
        return f.read().splitlines()


def get_colors(xresources_path):
    """Return list of hex colors."""

    lines = get_file_lines(xresources_path)
    hex_code = re.compile('\#\w+')

    return [ hex_code.search(line).group(0)
             for line in lines
             if hex_code.search(line) ]


def x_to_kitty(xresources_path, out_path='kitty.conf'):
    """Make kitty.conf from .Xresources."""

    kitty = []

    for i, line in enumerate(get_colors(xresources_path)):
        if len(line) >= 1:
            if line[0] == '!':
                # Not the first comment, so add a line break before it
                if i > 0:
                    kitty.append('\n')

                kitty.append('#{}'.format(line[1:]))
        elif line[0] == '*':
            kitty.append(line[2:].replace(':', ''))

    with open(out_path, 'w') as output:
        output.write('\n'.join(kitty))


def x_to_jekyll(xresources_path, name, indent=4, out_path='def'):
    """Automatically generate jekyll post from .Xresources."""

    front_matter = """\
        ---
        layout: color-scheme
        title: {}
        tags: color-scheme
        parent:
            title: Terminal Themes
            url: /term-themes/
        colors:
        {}
        downloads:
            kitty: /assets/colors/{}/kitty.conf
            xresources: /assets/colors/{}/.Xresources
        ---\
    """

    colors = get_colors(xresources_path)
    color_names = []
    yaml_color_names = []
    indent = ' ' * indent
    print colors


    # Create YAML styled color names
    for color_name in COLOR_NAMES:
        color_names.append(color_name)
        color_names.append('light_{}'.format(color_name))

    print color_names

    for i, color in enumerate(colors[:3]):
        yaml_color_names.append("{}{}: '{}'".format(indent,
                                        SPECIAL_NAMES[i],
                                        color))

    for i, color in enumerate(colors[3:]):
        yaml_color_names.append("{}{}: '{}'".format(indent,
                                      color_names[i],
                                      color))

    if out_path == 'def':
        today = datetime.today()
        day = today.day
        month = today.month
        year = today.year

        if today.day < 10:
            day = '0' + str(today.day)

        if today.month < 10:
            month = '0' + str(today.month)

        out_path = '{}-{}-{}-{}.md'.format(year,
                                           month,
                                           day,
                                           name)

    with open(out_path, 'w') as output:
        text = dedent(front_matter).format(name.title(),
                                   '\n'.join(yaml_color_names),
                                   name,
                                   name
                                   )
        output.write(text)

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        x_to_jekyll(sys.argv[1], sys.argv[2])
    else:
        print "pass in path to .Xresources file and name of theme"
