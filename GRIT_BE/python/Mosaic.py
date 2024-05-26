#!/usr/bin/env python
import os, random, argparse
from PIL import Image
import numpy as np
from datetime import datetime, timedelta
from calendar import monthrange
import json
import sys

now = datetime.now()
str_month = str(now.month)

class Args(): pass
args = Args()
args.target = f'./image_pool/badges/input_{str_month}.jpg'
args.images = './image_pool'
args.grid = [100,100]
args.output = f'./image_pool/badges/output_{str_month}.jpg'

target_name = str(sys.argv[1])

def getImages(images_directory, target_name):
    files = os.listdir(images_directory)
    images = []
    now = datetime.now()
    current_month_str = now.strftime("%m")
    count = 0
    for file in files:
            filePath = os.path.abspath(os.path.join(images_directory, file))
            file_infors = file.split('_') #['1', '20240503', '1234'] 이런식으로 저장
            # print(file_infors[0], file_infors[1][4:6]) // ID, 월(01처럼 두글자) 인덱싱
            if((target_name == file_infors[0]) and (current_month_str == file_infors[1][4:6])):
                try:                
                    fp = open(filePath, "rb")
                    im = Image.open(fp)
                    images.append(im)
                    im.load()
                    fp.close()
                    count+=1
                except:
                    print("Invalid image: %s" % (filePath,))
    return images




def getAverageRGB(image):
    im = np.array(image)
    w, h, d = im.shape
    return (tuple(np.average(im.reshape(w * h, d), axis=0)))


def splitImage(image, size):
    W, H = image.size[0], image.size[1]
    m, n = size
    w, h = int(W / n), int(H / m)
    imgs = []
    for j in range(m):
        for i in range(n):
            imgs.append(image.crop((i * w, j * h, (i + 1) * w, (j + 1) * h)))
    return (imgs)


def getBestMatchIndex(input_avg, avgs, random_pool=100):
    avg = input_avg
    index = 0
    min_index = 0
    min_dist = float("inf")

    # adds a bit of randomness
    idx = np.random.choice(np.arange(len(avgs)), random_pool)
    
    for index in idx:
        val = avgs[index]
        dist = ((val[0] - avg[0]) * (val[0] - avg[0]) +
                (val[1] - avg[1]) * (val[1] - avg[1]) +
                (val[2] - avg[2]) * (val[2] - avg[2]))

        if dist < min_dist:
            min_dist = dist
            min_index = index
    
    return min_index


def createImageGrid(images, dims):
    m, n = dims
    width = max([img.size[0] for img in images])
    height = max([img.size[1] for img in images])
    grid_img = Image.new('RGB', (n * width, m * height))
    for index in range(len(images)):
        row = int(index / n)
        col = index - n * row
        grid_img.paste(images[index], (col * width, row * height))
    return (grid_img)


def createPhotomosaic(target_image, input_images, grid_size,
                      reuse_images=True):
    target_images = splitImage(target_image, grid_size)

    output_images = []
    count = 0
    batch_size = int(len(target_images) / 10)
    avgs = []
    for img in input_images:
        try:
            avgs.append(getAverageRGB(img))
        except ValueError:
            continue

    for img in target_images:
        avg = getAverageRGB(img)
        match_index = getBestMatchIndex(avg, avgs)
        output_images.append(input_images[match_index])
        if count > 0 and batch_size > 10 and count % batch_size == 0:
            print('processed %d of %d...' % (count, len(target_images)))
        count += 1
        # remove selected image from input if flag set
        if not reuse_images:
            input_images.remove(match_index)

    mosaic_image = createImageGrid(output_images, grid_size)
    return (mosaic_image)


### ---------------------------------------------


target_image = Image.open(args.target)

# input images
print('reading input folder...')
input_images = getImages(args.images, target_name)

# check if any valid input images found
if input_images == []:
    print('No input images found in %s. Exiting.' % (args.images,))
    exit()

# shuffle list - to get a more varied output?
random.shuffle(input_images)

# size of grid
grid_size = (int(args.grid[0]), int(args.grid[1]))

# output
output_filename = 'mosaic.jpeg'
if args.output:
    output_filename = args.output

# re-use any image in input
reuse_images = True

# resize the input to fit original image size?
resize_input = True

print('starting photomosaic creation...')

# if images can't be reused, ensure m*n <= num_of_images
if not reuse_images:
    if grid_size[0] * grid_size[1] > len(input_images):
        print('grid size less than number of images')
        exit()

# resizing input
if resize_input:
    print('resizing images...')
    # for given grid size, compute max dims w,h of tiles
    dims = (int(target_image.size[0] / grid_size[1]),
            int(target_image.size[1] / grid_size[0]))
    print("max tile dims: %s" % (dims,))
    # resize
    for img in input_images:
        img.thumbnail(dims)

# create photomosaic
mosaic_image = createPhotomosaic(target_image, input_images, grid_size, reuse_images)

# write out mosaic
mosaic_image.save(output_filename, 'jpeg')

print("saved output to %s" % (output_filename,))
print('done.')