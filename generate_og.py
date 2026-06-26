from PIL import Image, ImageDraw, ImageFont
import os

# Settings
width, height = 1200, 630
bg_color = "#114C5A" # Nocturnal Expedition
text_color = "#FFC801" # Forsythia
title = "Velocity AI"
subtitle = "Autonomous Data Automation for Modern Teams"

# Create image
img = Image.new("RGB", (width, height), color=bg_color)
draw = ImageDraw.Draw(img)

# We will just draw text. We can use a default font if JetBrains is not available.
try:
    title_font = ImageFont.truetype("/System/Library/Fonts/Monaco.ttf", 100)
    subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
except:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()

# Get bounding box for title
_, _, tw, th = draw.textbbox((0, 0), title, font=title_font)
draw.text(((width - tw) / 2, (height - th) / 2 - 40), title, fill=text_color, font=title_font)

# Get bounding box for subtitle
_, _, sw, sh = draw.textbbox((0, 0), subtitle, font=subtitle_font)
draw.text(((width - sw) / 2, (height - sh) / 2 + 60), subtitle, fill="#D9E8E2", font=subtitle_font)

img.save("public/og-image.png")
print("og-image.png generated")
