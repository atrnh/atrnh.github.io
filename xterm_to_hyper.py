import re
from datetime import datetime

COLOR_NAMES = [
    'fg',
    'bg',
    'cc',
    'black',
    'light_black',
    'red',
    'light_red',
    'green',
    'light_green',
    'yellow',
    'light_yellow',
    'blue',
    'light_blue',
    'magenta',
    'light_magenta',
    'cyan',
    'light_cyan',
    'white',
    'light_white'
]


def make_colors_js(colors):
    """kdkddkd."""

    js = []

    js.append("foregroundColor: '{}',".format(colors[0]))
    js.append("backgroundColor: '{}',".format(colors[1]))
    js.append("cursorColor: '{}',".format(colors[2]))
    js.append("colors: {")

    colors = list(reversed(colors[3::]))
    color_pairs = []
    while len(colors) > 0:
        color_pairs.append((colors.pop(), colors.pop()))



    for i, c_name in enumerate(COLOR_NAMES):
        js.append("  {}: '{}',".format(c_name, color_pairs[i][0]))
        js.append("  light{}: '{}',".format(c_name.capitalize(),
                                              color_pairs[i][1]
                                              ))

    js.append('}')

    return '\n'.join(js)


def get_colors(lines):
    """Return hex colors as a list."""

    patt = re.compile('\#\w+')

    colors = [patt.search(line).group(0)
              for line in lines
              if patt.search(line)
              ]
    return colors


def get_file_lines(filename):
    f = open(filename)
    lines = f.read().splitlines()
    f.close()

    return lines


def xterm_to_hyper(filename):

    x_file = open(filename)
    xterm = x_file.read().splitlines()
    x_file.close()

    colors = get_colors(xterm)

    with open('hypercolors.txt', 'w') as hyper:
        hyper.write(make_colors_js(colors))


def xterm_to_kitty(filename):
    """Create a file for kitty prefs."""
    kitty_lines = []
    lines = get_file_lines(filename)

    for line in lines:
        if len(line) >= 1:
            if line[0] == '!':
                # convert to a kitty style comment
                line = '#{}'.format(line[1:])
                print(line)
                kitty_lines.append(line)
            elif line[0] == '*':
                # get rid of *.
                line = line[2:].replace(':', '')
                print(line)

                kitty_lines.append(line)

    with open('to_kitty_out', 'w') as output:
        output.write('\n'.join(kitty_lines))


def xterm_to_yaml(filename):
    date = datetime.now().strftime('%Y-%m-%d')
    outfile_name = f"{date}-{filename}.md"

    yaml_lines = [
        '---',
        'layout: color-scheme',
        'title: <TITLE>',
        'tags: color-scheme',
        'parent:',
        '    title: Terminal Themes',
        '    url: /term-themes/',
        'colors:',
    ]

    yaml_meta = [
        'downloads:',
        f"    kitty: /assets/colors/{filename}/kitty.conf",
        f"    xresources: /assets/colors/{filename}/.Xresources",
        'screenshots: <SCREENSHOT>',
        '---',
    ]

    lines = get_file_lines(filename)

    colors = get_colors(lines)

    for i, color in enumerate(COLOR_NAMES):
        color_line = "    {}: '{}'".format(color, colors[i])
        print(color_line)
        yaml_lines.append(color_line)

    yaml_lines.extend(yaml_meta)

    with open(outfile_name, 'w') as output:
        output.write('\n'.join(yaml_lines))


if __name__ == "__main__":
    import sys

    options = {
        '--yaml': xterm_to_yaml,
        '--kitty': xterm_to_kitty,
        '--json': xterm_to_hyper
    }
    mode = sys.argv[1]
    filename = sys.argv[2]

    options[mode](filename)
