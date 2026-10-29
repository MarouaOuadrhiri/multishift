import os
from PIL import Image, ImageDraw
import numpy as np

folder = r'public\New folder'
furn_path = os.path.join(folder, 'Contemporary luxury living room showcase-2.png')
furn = Image.open(furn_path).convert('RGB')
W, H = furn.size

# Precise pixel coordinates of objects on the 1672 x 941 canvas:
# We determine these by inspecting the furnished room and verifying edges.
targets = {
    # 01 Rug:
    # Lies on the floor under sofa, coffee table, and front edge extends down to y=815, left x=86, right x=1548
    'rug': {
        'x': 86,
        'y': 615,
        'w': 1464,
        'h': 200,
        'z': 1
    },
    # 02 Sofa:
    # Left edge of chaise starts at x=325, top cushion at y=515, right arm at x=1245, bottom at y=715
    'sofa': {
        'x': 325,
        'y': 515,
        'w': 920,
        'h': 200,
        'z': 2
    },
    # 03 Left Side Table:
    # Wood cylinder with brown bowl on left of chaise: x=287, y=588, w=82, h=118
    'left_table': {
        'x': 287,
        'y': 588,
        'w': 82,
        'h': 118,
        'z': 3
    },
    # 04 Coffee Table:
    # Rectangular black stone + walnut coffee table: x=698, y=632, w=412, h=104
    'coffee_table': {
        'x': 698,
        'y': 632,
        'w': 412,
        'h': 104,
        'z': 4
    },
    # 05 Lounge Chair:
    # Ivory boucle rounded swivel armchair in foreground: x=1120, y=588, w=338, h=232
    'lounge_chair': {
        'x': 1120,
        'y': 588,
        'w': 338,
        'h': 232,
        'z': 8
    },
    # 06 Right Side Table:
    # Dark brown/black marble cylinder with bowl next to armchair: x=1445, y=618, w=96, h=148
    'right_table': {
        'x': 1445,
        'y': 618,
        'w': 96,
        'h': 148,
        'z': 7
    },
    # 07 Wooden Console:
    # Low wooden sideboard in right hallway: x=1480, y=528, w=192, h=114
    'wooden_console': {
        'x': 1480,
        'y': 528,
        'w': 192,
        'h': 114,
        'z': 2
    },
    # 08 Floor Lamp:
    # Arched bronze floor lamp: base at x=1300, arch reaches y=375, shade at x=1165, y=410, w=355, h=230
    'floor_lamp': {
        'x': 1165,
        'y': 375,
        'w': 355,
        'h': 230,
        'z': 5
    },
    # 09 Olive Tree:
    # Olive tree in round sandy planter: x=1285, y=360, w=142, h=238
    'olive_tree': {
        'x': 1285,
        'y': 360,
        'w': 142,
        'h': 238,
        'z': 3
    },
    # 10 Throw Blanket:
    # Taupe knitted throw blanket draped over left sofa chaise: x=425, y=592, w=160, h=130
    'throw_blanket': {
        'x': 425,
        'y': 592,
        'w': 160,
        'h': 130,
        'z': 6
    },
    # 11 Center Vase:
    # Textured beige ceramic vase with olive branches on coffee table: x=825, y=515, w=96, h=128
    'center_vase': {
        'x': 825,
        'y': 515,
        'w': 96,
        'h': 128,
        'z': 6
    },
    # 12 Decorative Tray:
    # Sculptural wood bowl/tray with stones on coffee table: x=752, y=618, w=118, h=54
    'decorative_tray': {
        'x': 752,
        'y': 618,
        'w': 118,
        'h': 54,
        'z': 6
    },
    # 13 Bowl and Books:
    # Stacked linen books with dark ceramic bowl on coffee table: x=936, y=620, w=108, h=56
    'bowl_books': {
        'x': 936,
        'y': 620,
        'w': 108,
        'h': 56,
        'z': 6
    }
}

# Draw bounding boxes on a copy to verify
preview = furn.copy()
draw = ImageDraw.Draw(preview)
colors = ['#FF3366', '#33CCFF', '#33FF66', '#FFCC33', '#CC33FF', '#33FFAA', '#FF9933', '#FFFF33']
for i, (name, box) in enumerate(targets.items()):
    c = colors[i % len(colors)]
    x, y, w, h = box['x'], box['y'], box['w'], box['h']
    draw.rectangle([x, y, x + w, y + h], outline=c, width=2)
    draw.text((x + 2, y + 2), name, fill=c)

preview.save('targets_preview.png')
print("targets_preview.png saved successfully!")
