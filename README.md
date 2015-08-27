# UPlayer.js

Performance & Pluggable Animation Player by U.E.M. Team

## Quick Start

### Install UPlayer

	bower install uplayer

### Get Source

Clone
	
	git clone git@github.com:aaron61591/uplayer.js.git

Initialize project:

    npm install

Run it:

    grunt

Check it:

    http://127.0.0.1:4000

## API Reference

### UPlayer(opt)

Instantiate a UPlayer object with option

#### opt.id

Element's id created by UPlayer

#### opt.fps

FPS the UPlayer will run

#### opt.debug

Whether run UPlayer with debug model

#### opt.fullscreen

Whether full screen display

### plug(opt)

Plug a animation model to UPlayer

#### opt.id

Id of this plugin

#### opt.zIndex

Z index of this plugin

#### opt.frame

Animate total frame for running performance

#### opt.render(ctx, frame)

Render function call every frame

### plugCard(opt)

Plug a animation model which rendered by image card

#### opt.id

Id of this plugin

#### opt.src

Image card url

#### opt.zIndex

Z index of this plugin

#### opt.frame

Animate total frame for running performance

#### opt.pulse(ctx, frame)

function call every frame before rendering

### unplug(id)

Unplug animation model by id

### run

Start UPlayer

### pause

Pause UPlayer

### stop

Stop UPlayer
