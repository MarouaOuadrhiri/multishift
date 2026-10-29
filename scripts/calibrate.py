import os
from PIL import Image
import numpy as np

folder = r'public\New folder'
files = os.listdir(folder)

# Map our items to filenames by index
asset_map = {
    'rug': files[23],             # Woven Beige Rug Cutout-9.png
    'sofa': files[14],            # Ivory boucle modular sofa with chaise-2.png
    'left_table': files[2],       # Beige pedestal table with brown bowl-14.png
    'coffee_table': files[15],    # Low walnut coffee table with black stone-5.png
    'lounge_chair': files[13],    # Ivory Boucle Armchair Cutout-13.png
    'right_table': files[7],      # Dark stone side table with shallow bowl-15.png
    'wooden_console': files[22],  # Wooden sideboard with ceramic vases and bowl-19.png
    'floor_lamp': files[4],       # Bronze arched lamp cutout-10.png
    'olive_tree': files[20],      # Tall olive tree in sandy stone planter-12.png
    'throw_blanket': files[8],    # Draped Taupe Knitted Throw Blanket-20.png
    'center_vase': files[0],      # Beige ceramic vase with olive branches-6.png
    'decorative_tray': files[18], # Rustic tray with decorative stones-16.png
    'bowl_books': files[3],       # Black ceramic bowl on stacked books-18.png
}

furn = Image.open(os.path.join(folder, files[5])).convert('RGB')
empty = Image.open(os.path.join(folder, files[11])).convert('RGB')
furn_arr = np.array(furn)
empty_arr = np.array(empty)

diff = np.abs(furn_arr.astype(float) - empty_arr.astype(float))
diff_mask = (diff.max(axis=-1) > 20)

print(f"Furnished size: {furn.size}")

# For each asset, find its non-empty bounding box in the cutout
for name, filename in asset_map.items():
    img = Image.open(os.path.join(folder, filename))
    arr = np.array(img)
    alpha = arr[:, :, 3]
    nonzero = np.argwhere(alpha > 20)
    if len(nonzero) > 0:
        ymin, xmin = nonzero.min(axis=0)
        ymax, xmax = nonzero.max(axis=0)
        cutout_w = xmax - xmin + 1
        cutout_h = ymax - ymin + 1
        print(f"{name:15} | file: {filename[:30]:30} | original: {img.size} | bbox: x={xmin}, y={ymin}, w={cutout_w}, h={cutout_h}")
    else:
        print(f"{name:15} | EMPTY!")
