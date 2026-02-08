
from PIL import Image
import os

def resize_image(input_path, output_path, max_size=(512, 512)):
    try:
        if not os.path.exists(input_path):
            print(f"File not found: {input_path}")
            return

        with Image.open(input_path) as img:
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            img.save(output_path, optimize=True, quality=85)
            print(f"Resized {input_path} to {output_path}")

    except Exception as e:
        print(f"Error processing {input_path}: {e}")

# Paths
base_dir = r"c:\Users\rifqy\Documents\KULIAH\BELAJAR\NEXT JS\umkmdashboard\dashboard-app"
public_logo = os.path.join(base_dir, "public", "logo.png")
app_icon = os.path.join(base_dir, "src", "app", "icon.png")

# Resize public logo (for navbar/footer display) - e.g. 512px width is plenty
resize_image(public_logo, public_logo, (512, 512))

# Resize app icon (typically 512x512 is standard, but file size optimization matters)
resize_image(app_icon, app_icon, (512, 512))
