import os
import json
from PIL import Image
import numpy as np

src_folder = r'public\New folder'
dest_folder = r'public\hero'
os.makedirs(dest_folder, exist_ok=True)

files = os.listdir(src_folder)

# Map our items to filenames by index
asset_defs = [
    {
        'id': 'rug',
        'order': 1,
        'label': 'Tapis d’espace',
        'file': files[23], # Woven Beige Rug Cutout-9.png
        'target': {'x': 86, 'y': 615, 'w': 1462, 'h': 207, 'z': 1},
        'animation': 'reveal-up',
    },
    {
        'id': 'sofa',
        'order': 2,
        'label': 'Canapé modulaire',
        'file': files[14], # Ivory boucle modular sofa with chaise-2.png
        'target': {'x': 325, 'y': 515, 'w': 920, 'h': 200, 'z': 2},
        'animation': 'descend-settle',
    },
    {
        'id': 'left-side-table',
        'order': 3,
        'label': 'Table d’appoint gauche',
        'file': files[2], # Beige pedestal table with brown bowl-14.png
        'target': {'x': 287, 'y': 588, 'w': 82, 'h': 118, 'z': 3},
        'animation': 'slide-left',
    },
    {
        'id': 'coffee-table',
        'order': 4,
        'label': 'Table basse noyer & pierre',
        'file': files[15], # Low walnut coffee table with black stone-5.png
        'target': {'x': 698, 'y': 635, 'w': 412, 'h': 100, 'z': 4},
        'animation': 'descend-scale',
    },
    {
        'id': 'lounge-chair',
        'order': 5,
        'label': 'Fauteuil bouclé',
        'file': files[13], # Ivory Boucle Armchair Cutout-13.png
        'target': {'x': 1120, 'y': 588, 'w': 340, 'h': 232, 'z': 8},
        'animation': 'slide-right',
    },
    {
        'id': 'right-side-table',
        'order': 6,
        'label': 'Table marbre droite',
        'file': files[7], # Dark stone side table with shallow bowl-15.png
        'target': {'x': 1445, 'y': 618, 'w': 96, 'h': 148, 'z': 7},
        'animation': 'rise-fade',
    },
    {
        'id': 'wooden-console',
        'order': 7,
        'label': 'Console en bois massif',
        'file': files[22], # Wooden sideboard with ceramic vases and bowl-19.png
        'target': {'x': 1478, 'y': 528, 'w': 194, 'h': 118, 'z': 2},
        'animation': 'slide-right',
    },
    {
        'id': 'floor-lamp',
        'order': 8,
        'label': 'Lampadaire arqué bronze',
        'file': files[4], # Bronze arched lamp cutout-10.png
        'target': {'x': 1165, 'y': 375, 'w': 355, 'h': 230, 'z': 5},
        'animation': 'rise-vertical',
    },
    {
        'id': 'olive-tree',
        'order': 9,
        'label': 'Olivier en pot minéral',
        'file': files[20], # Tall olive tree in sandy stone planter-12.png
        'target': {'x': 1285, 'y': 358, 'w': 142, 'h': 240, 'z': 3},
        'animation': 'fade-scale',
    },
    {
        'id': 'throw-blanket',
        'order': 10,
        'label': 'Plaid en maille taupe',
        'file': files[8], # Draped Taupe Knitted Throw Blanket-20.png
        'target': {'x': 425, 'y': 590, 'w': 160, 'h': 130, 'z': 6},
        'animation': 'reveal-sofa',
    },
    {
        'id': 'center-vase',
        'order': 11,
        'label': 'Vase en céramique & olivier',
        'file': files[0], # Beige ceramic vase with olive branches-6.png
        'target': {'x': 825, 'y': 515, 'w': 96, 'h': 128, 'z': 6},
        'animation': 'descend-table',
    },
    {
        'id': 'decorative-tray',
        'order': 12,
        'label': 'Plateau sculpté & minéraux',
        'file': files[18], # Rustic tray with decorative stones-16.png
        'target': {'x': 752, 'y': 618, 'w': 118, 'h': 54, 'z': 6},
        'animation': 'fade-table',
    },
    {
        'id': 'bowl-books',
        'order': 13,
        'label': 'Ouvrages d’art & bol noir',
        'file': files[3], # Black ceramic bowl on stacked books-18.png
        'target': {'x': 936, 'y': 620, 'w': 108, 'h': 56, 'z': 6},
        'animation': 'settle-books',
    },
]

# 1. Process Empty & Furnished main room images
empty_src = os.path.join(src_folder, files[11]) # Empty luxury showroom with garden views-1.png
furn_src = os.path.join(src_folder, files[5])   # Contemporary luxury living room showcase-2.png

empty_img = Image.open(empty_src).convert('RGB')
furn_img = Image.open(furn_src).convert('RGB')

# Save as webp & png
empty_img.save(os.path.join(dest_folder, 'hero-empty.webp'), 'WEBP', quality=93)
empty_img.save(os.path.join(dest_folder, 'hero-empty.png'), 'PNG')
furn_img.save(os.path.join(dest_folder, 'hero-furnished.webp'), 'WEBP', quality=93)
furn_img.save(os.path.join(dest_folder, 'hero-furnished.png'), 'PNG')

print("Main room images saved to public/hero/")

# 2. Process each furniture asset: trim to non-transparent bounding box
processed_assets = []
CANVAS_W = 1672.0
CANVAS_H = 941.0

for item in asset_defs:
    src_path = os.path.join(src_folder, item['file'])
    img = Image.open(src_path).convert('RGBA')
    arr = np.array(img)
    alpha = arr[:, :, 3]
    nonzero = np.argwhere(alpha > 15)
    
    if len(nonzero) > 0:
        ymin, xmin = nonzero.min(axis=0)
        ymax, xmax = nonzero.max(axis=0)
        trimmed = img.crop((xmin, ymin, xmax + 1, ymax + 1))
    else:
        trimmed = img

    # Save trimmed asset
    webp_name = f"{item['id']}.webp"
    png_name = f"{item['id']}.png"
    trimmed.save(os.path.join(dest_folder, webp_name), 'WEBP', quality=95)
    trimmed.save(os.path.join(dest_folder, png_name), 'PNG')
    
    t = item['target']
    # Calculate percentage coordinates relative to 1672 x 941 canvas
    pct_left = (t['x'] / CANVAS_W) * 100.0
    pct_top = (t['y'] / CANVAS_H) * 100.0
    pct_width = (t['w'] / CANVAS_W) * 100.0
    pct_height = (t['h'] / CANVAS_H) * 100.0
    
    processed_assets.append({
        'id': item['id'],
        'order': item['order'],
        'label': item['label'],
        'srcWebp': f"/hero/{webp_name}",
        'srcPng': f"/hero/{png_name}",
        'style': {
            'left': f"{pct_left:.4f}%",
            'top': f"{pct_top:.4f}%",
            'width': f"{pct_width:.4f}%",
            'height': f"{pct_height:.4f}%",
            'zIndex': t['z'],
        },
        'pixelBox': t,
        'animation': item['animation'],
    })
    print(f"Processed {item['id']}: left={pct_left:.2f}%, top={pct_top:.2f}%, w={pct_width:.2f}%, h={pct_height:.2f}%")

# Save metadata JSON for the React frontend
metadata_path = os.path.join(dest_folder, 'furniture-data.json')
with open(metadata_path, 'w', encoding='utf-8') as f:
    json.dump({
        'canvas': {'width': 1672, 'height': 941, 'aspectRatio': 1672 / 941},
        'emptyImage': '/hero/hero-empty.webp',
        'furnishedImage': '/hero/hero-furnished.webp',
        'pieces': processed_assets
    }, f, indent=2, ensure_ascii=False)

print(f"Assets and metadata successfully generated at {dest_folder}!")
