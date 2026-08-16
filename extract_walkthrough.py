import os
import zipfile
import re
import shutil

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

def process_zips():
    zip_mapping = [
        ("1.zip", "public/walkthrough/01-arrival"),
        ("2.zip", "public/walkthrough/02-entry"),
        ("3.zip", "public/walkthrough/03-living-lounge-bedroom"),
        ("4.zip", "public/walkthrough/04-bedroom-retreat"),
        ("5.zip", "public/walkthrough/05-retreat-bathroom"),
    ]

    for zip_name, target_dir in zip_mapping:
        if not os.path.exists(zip_name):
            print(f"Skipping {zip_name}, file not found")
            continue
            
        os.makedirs(target_dir, exist_ok=True)
        print(f"Extracting {zip_name} to {target_dir}...")
        
        with zipfile.ZipFile(zip_name, 'r') as zf:
            for member in zf.namelist():
                if member.lower().endswith(('.jpg', '.jpeg')):
                    match = re.search(r'(\d+)', os.path.basename(member))
                    if match:
                        num = int(match.group(1))
                        dest_filename = f"{num:03d}.jpg"
                    else:
                        dest_filename = os.path.basename(member)
                    
                    dest_path = os.path.join(target_dir, dest_filename)
                    with zf.open(member) as src_file, open(dest_path, 'wb') as dst_file:
                        dst_file.write(src_file.read())
        
        extracted_files = [f for f in os.listdir(target_dir) if f.endswith('.jpg')]
        print(f"Done {zip_name}: {len(extracted_files)} frames extracted.")

def create_detail_crops():
    print("Generating detail images from walkthrough frames...")
    os.makedirs("public/images/details", exist_ok=True)
    
    crops = [
        ("public/walkthrough/01-arrival/150.jpg", (0.3, 0.2, 0.7, 0.8), "facade_wood.jpg"),
        ("public/walkthrough/01-arrival/300.jpg", (0.2, 0.2, 0.8, 0.8), "entrance_door.jpg"),
        ("public/walkthrough/02-entry/180.jpg", (0.4, 0.3, 0.8, 0.7), "living_chandelier.jpg"),
        ("public/walkthrough/02-entry/220.jpg", (0.1, 0.2, 0.6, 0.8), "cane_furniture.jpg"),
        ("public/walkthrough/03-living-lounge-bedroom/120.jpg", (0.2, 0.3, 0.7, 0.8), "lounge_chairs.jpg"),
        ("public/walkthrough/03-living-lounge-bedroom/280.jpg", (0.3, 0.2, 0.8, 0.7), "four_poster_bed.jpg"),
        ("public/walkthrough/04-bedroom-retreat/150.jpg", (0.2, 0.2, 0.7, 0.8), "coral_curtains.jpg"),
        ("public/walkthrough/04-bedroom-retreat/250.jpg", (0.3, 0.3, 0.8, 0.8), "crystal_pendant.jpg"),
        ("public/walkthrough/05-retreat-bathroom/100.jpg", (0.2, 0.2, 0.7, 0.7), "stone_counter.jpg"),
        ("public/walkthrough/05-retreat-bathroom/200.jpg", (0.3, 0.2, 0.8, 0.8), "textured_tiles.jpg"),
        ("public/walkthrough/02-entry/140.jpg", (0.2, 0.2, 0.6, 0.7), "tv_wall_wood.jpg"),
        ("public/walkthrough/03-living-lounge-bedroom/150.jpg", (0.4, 0.2, 0.9, 0.7), "roman_blinds.jpg")
    ]
    
    for src_rel, (l, t, r, b), out_name in crops:
        out_path = os.path.join("public/images/details", out_name)
        if os.path.exists(src_rel):
            if HAS_PIL:
                try:
                    img = Image.open(src_rel)
                    w, h = img.size
                    crop_box = (int(l * w), int(t * h), int(r * w), int(b * h))
                    cropped = img.crop(crop_box)
                    cropped.save(out_path, quality=92)
                    print(f"Created crop with PIL: {out_name}")
                    continue
                except Exception as e:
                    print(f"PIL crop failed: {e}")
            
            shutil.copyfile(src_rel, out_path)
            print(f"Copied full frame as detail: {out_name}")

if __name__ == "__main__":
    process_zips()
    create_detail_crops()

