export default function makeAnimations(scene) {
    // TONS of animations. Everything animation-related is ugly and stupid below. 
    let config = {
        key: 'lincoln_stop',
        frames: [
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0010.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0002.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0003.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0004.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0005.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0006.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0007.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0008.png' },
            { key:'lincoln_sprites', frame:'lincolnstop/0009.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lincoln_left',
        frames: [
            { key:'lincoln_sprites', frame:'lincolnleft/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0002.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0003.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0004.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0005.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0006.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0007.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0008.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0009.png' },
            { key:'lincoln_sprites', frame:'lincolnleft/0010.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lincoln_right',
        frames: [
            { key:'lincoln_sprites', frame:'lincolnright/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0002.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0003.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0004.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0005.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0006.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0007.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0008.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0009.png' },
            { key:'lincoln_sprites', frame:'lincolnright/0010.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lincoln_exit',
        frames: [
            { key:'lincoln_sprites', frame:'lincolnexit/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0002.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0003.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0002.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0001.png' },
            { key:'lincoln_sprites', frame:'lincolnexit/0001.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lincoln_back',
        frames: [
            { key:'lincoln_sprites', frame:'lincolnback/0001.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lincoln_stair_left',
        frames: [
            { key:'lincoln_sprites', frame:'lincolnleft/0007.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lincoln_stair_right',
        frames: [
            { key:'lincoln_sprites', frame:'lincolnright/0007.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lincoln_crawl',
        frames: [
            { key:'lincoln_sprites', frame:'lincolncrawl/0001.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0002.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0003.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0004.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0005.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0006.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0007.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0008.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0009.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0010.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0011.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0012.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0013.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0014.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0015.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0016.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0017.png' },
            { key:'lincoln_sprites', frame:'lincolncrawl/0018.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lincoln_crawl_front',
        frames: [
            { key:'lincoln_sprites', frame:'lincolncrawlfront/0001.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);



    config = {
        key: 'clyde_stop',
        frames: [
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0001.png' },
            { key:'clyde_sprites', frame:'clydestop/0002.png' },
            { key:'clyde_sprites', frame:'clydestop/0003.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0004.png' },
            { key:'clyde_sprites', frame:'clydestop/0003.png' },
            { key:'clyde_sprites', frame:'clydestop/0002.png' }
        ],
        frameRate: 12,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'clyde_left',
        frames: [
            { key:'clyde_sprites', frame:'clydeleft/0001.png' },
            { key:'clyde_sprites', frame:'clydeleft/0002.png' },
            { key:'clyde_sprites', frame:'clydeleft/0003.png' },
            { key:'clyde_sprites', frame:'clydeleft/0004.png' },
            { key:'clyde_sprites', frame:'clydeleft/0005.png' },
            { key:'clyde_sprites', frame:'clydeleft/0006.png' },
            { key:'clyde_sprites', frame:'clydeleft/0007.png' },
            { key:'clyde_sprites', frame:'clydeleft/0008.png' },
            { key:'clyde_sprites', frame:'clydeleft/0009.png' },
            { key:'clyde_sprites', frame:'clydeleft/0010.png' },
            { key:'clyde_sprites', frame:'clydeleft/0011.png' },
            { key:'clyde_sprites', frame:'clydeleft/0012.png' },
            { key:'clyde_sprites', frame:'clydeleft/0013.png' },
            { key:'clyde_sprites', frame:'clydeleft/0014.png' },
            { key:'clyde_sprites', frame:'clydeleft/0015.png' },
            { key:'clyde_sprites', frame:'clydeleft/0016.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'clyde_right',
        frames: [
            { key:'clyde_sprites', frame:'clyderight/0001.png' },
            { key:'clyde_sprites', frame:'clyderight/0002.png' },
            { key:'clyde_sprites', frame:'clyderight/0003.png' },
            { key:'clyde_sprites', frame:'clyderight/0004.png' },
            { key:'clyde_sprites', frame:'clyderight/0005.png' },
            { key:'clyde_sprites', frame:'clyderight/0006.png' },
            { key:'clyde_sprites', frame:'clyderight/0007.png' },
            { key:'clyde_sprites', frame:'clyderight/0008.png' },
            { key:'clyde_sprites', frame:'clyderight/0009.png' },
            { key:'clyde_sprites', frame:'clyderight/0010.png' },
            { key:'clyde_sprites', frame:'clyderight/0011.png' },
            { key:'clyde_sprites', frame:'clyderight/0012.png' },
            { key:'clyde_sprites', frame:'clyderight/0013.png' },
            { key:'clyde_sprites', frame:'clyderight/0014.png' },
            { key:'clyde_sprites', frame:'clyderight/0015.png' },
            { key:'clyde_sprites', frame:'clyderight/0016.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'clyde_exit',
        frames: [
            { key:'clyde_sprites', frame:'clydelook/0001.png' },
            { key:'clyde_sprites', frame:'clydelook/0001.png' },
            { key:'clyde_sprites', frame:'clydelook/0001.png' },
            { key:'clyde_sprites', frame:'clydelook/0001.png' },
            { key:'clyde_sprites', frame:'clydelook/0001.png' },
            { key:'clyde_sprites', frame:'clydelook/0001.png' },
            { key:'clyde_sprites', frame:'clydelook/0001.png' },
            { key:'clyde_sprites', frame:'clydelook/0001.png' },
            { key:'clyde_sprites', frame:'clydelook/0002.png' },
            { key:'clyde_sprites', frame:'clydelook/0003.png' },
            { key:'clyde_sprites', frame:'clydelook/0004.png' },
            { key:'clyde_sprites', frame:'clydelook/0005.png' },
            { key:'clyde_sprites', frame:'clydelook/0004.png' },
            { key:'clyde_sprites', frame:'clydelook/0003.png' },
            { key:'clyde_sprites', frame:'clydelook/0003.png' },
            { key:'clyde_sprites', frame:'clydelook/0003.png' },
            { key:'clyde_sprites', frame:'clydelook/0003.png' },
            { key:'clyde_sprites', frame:'clydelook/0003.png' },
            { key:'clyde_sprites', frame:'clydelook/0003.png' },
            { key:'clyde_sprites', frame:'clydelook/0004.png' },
            { key:'clyde_sprites', frame:'clydelook/0005.png' },
            { key:'clyde_sprites', frame:'clydelook/0004.png' },
            { key:'clyde_sprites', frame:'clydelook/0003.png' },
            { key:'clyde_sprites', frame:'clydelook/0002.png' }
        ],
        frameRate: 12,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'clyde_back',
        frames: [
            { key:'clyde_sprites', frame:'clydestop/0001.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'clyde_stair_left',
        frames: [
            { key:'clyde_sprites', frame:'clydeleft/0012.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'clyde_stair_right',
        frames: [
            { key:'clyde_sprites', frame:'clyderight/0012.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'clyde_crawl',
        frames: [
            { key:'clyde_sprites', frame:'clydecrawl/001.png' },
            { key:'clyde_sprites', frame:'clydecrawl/002.png' },
            { key:'clyde_sprites', frame:'clydecrawl/003.png' },
            { key:'clyde_sprites', frame:'clydecrawl/004.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);



    config = {
        key: 'ronnie_stop',
        frames: [
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/002.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/003.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/004.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/005.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/006.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/008.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/009.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/010.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/010.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/010.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/010.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/010.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/010.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/010.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/010.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/007.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/006.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/005.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/004.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/003.png' },
            { key:'bobby_sprites', frame:'ronnie_stop/002.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'ronnie_left',
        frames: [
            { key:'bobby_sprites', frame:'ronnie_left/001.png' },
            { key:'bobby_sprites', frame:'ronnie_left/002.png' },
            { key:'bobby_sprites', frame:'ronnie_left/003.png' },
            { key:'bobby_sprites', frame:'ronnie_left/004.png' },
            { key:'bobby_sprites', frame:'ronnie_left/005.png' },
            { key:'bobby_sprites', frame:'ronnie_left/006.png' },
            { key:'bobby_sprites', frame:'ronnie_left/007.png' },
            { key:'bobby_sprites', frame:'ronnie_left/008.png' },
            { key:'bobby_sprites', frame:'ronnie_left/009.png' },
            { key:'bobby_sprites', frame:'ronnie_left/010.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'ronnie_right',
        frames: [
            { key:'bobby_sprites', frame:'ronnie_right/001.png' },
            { key:'bobby_sprites', frame:'ronnie_right/002.png' },
            { key:'bobby_sprites', frame:'ronnie_right/003.png' },
            { key:'bobby_sprites', frame:'ronnie_right/004.png' },
            { key:'bobby_sprites', frame:'ronnie_right/005.png' },
            { key:'bobby_sprites', frame:'ronnie_right/006.png' },
            { key:'bobby_sprites', frame:'ronnie_right/007.png' },
            { key:'bobby_sprites', frame:'ronnie_right/008.png' },
            { key:'bobby_sprites', frame:'ronnie_right/009.png' },
            { key:'bobby_sprites', frame:'ronnie_right/010.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'ronnie_exit',
        frames: [
            { key:'bobby_sprites', frame:'ronnie_stop/001.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);
    
    config = {
        key: 'ronnie_back',
        frames: [
            { key:'bobby_sprites', frame:'ronnie_back/001.png' },
            { key:'bobby_sprites', frame:'ronnie_back/002.png' },
            { key:'bobby_sprites', frame:'ronnie_back/003.png' },
            { key:'bobby_sprites', frame:'ronnie_back/004.png' },
            { key:'bobby_sprites', frame:'ronnie_back/005.png' },
            { key:'bobby_sprites', frame:'ronnie_back/006.png' },
            { key:'bobby_sprites', frame:'ronnie_back/007.png' },
            { key:'bobby_sprites', frame:'ronnie_back/008.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'ronnie_stair_left',
        frames: [
            { key:'bobby_sprites', frame:'ronnie_left/001.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'ronnie_stair_right',
        frames: [
            { key:'bobby_sprites', frame:'ronnie_right/001.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);




    config = {
        key: 'bobby_stop',
        frames: [
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/001.png' },
            { key:'bobby_sprites', frame:'bobby_stop/002.png' },
            { key:'bobby_sprites', frame:'bobby_stop/003.png' },
            { key:'bobby_sprites', frame:'bobby_stop/003.png' },
            { key:'bobby_sprites', frame:'bobby_stop/003.png' },
            { key:'bobby_sprites', frame:'bobby_stop/003.png' },
            { key:'bobby_sprites', frame:'bobby_stop/003.png' },
            { key:'bobby_sprites', frame:'bobby_stop/003.png' },
            { key:'bobby_sprites', frame:'bobby_stop/003.png' },
            { key:'bobby_sprites', frame:'bobby_stop/003.png' },
            { key:'bobby_sprites', frame:'bobby_stop/002.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'bobby_left',
        frames: [
            { key:'bobby_sprites', frame:'bobby_left/001.png' },
            { key:'bobby_sprites', frame:'bobby_left/002.png' },
            { key:'bobby_sprites', frame:'bobby_left/003.png' },
            { key:'bobby_sprites', frame:'bobby_left/004.png' },
            { key:'bobby_sprites', frame:'bobby_left/005.png' },
            { key:'bobby_sprites', frame:'bobby_left/006.png' },
            { key:'bobby_sprites', frame:'bobby_left/007.png' },
            { key:'bobby_sprites', frame:'bobby_left/008.png' },
            { key:'bobby_sprites', frame:'bobby_left/009.png' },
            { key:'bobby_sprites', frame:'bobby_left/010.png' },
            { key:'bobby_sprites', frame:'bobby_left/011.png' },
            { key:'bobby_sprites', frame:'bobby_left/012.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'bobby_right',
        frames: [
            { key:'bobby_sprites', frame:'bobby_right/001.png' },
            { key:'bobby_sprites', frame:'bobby_right/002.png' },
            { key:'bobby_sprites', frame:'bobby_right/003.png' },
            { key:'bobby_sprites', frame:'bobby_right/004.png' },
            { key:'bobby_sprites', frame:'bobby_right/005.png' },
            { key:'bobby_sprites', frame:'bobby_right/006.png' },
            { key:'bobby_sprites', frame:'bobby_right/007.png' },
            { key:'bobby_sprites', frame:'bobby_right/008.png' },
            { key:'bobby_sprites', frame:'bobby_right/009.png' },
            { key:'bobby_sprites', frame:'bobby_right/010.png' },
            { key:'bobby_sprites', frame:'bobby_right/011.png' },
            { key:'bobby_sprites', frame:'bobby_right/012.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'bobby_exit',
        frames: [
            { key:'bobby_sprites', frame:'bobby_right/001.png' }
        ],
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'bobby_back',
        frames: [
            { key:'bobby_sprites', frame:'bobby_right/001.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'bobby_stair_left',
        frames: [
            { key:'bobby_sprites', frame:'bobby_right/001.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'bobby_stair_right',
        frames: [
            { key:'bobby_sprites', frame:'bobby_right/001.png' }
        ],
        frameRate: 1,
        repeat: -1
    };
    scene.anims.create(config);


    // characte sprites

    config = {
        key: 'lisa_animation',
        frames: [
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0002.png' },
            { key:'spritesheets', frame:'lisa/0003.png' },
            { key:'spritesheets', frame:'lisa/0004.png' },
            { key:'spritesheets', frame:'lisa/0001.png' },
            { key:'spritesheets', frame:'lisa/0002.png' },
            { key:'spritesheets', frame:'lisa/0003.png' },
            { key:'spritesheets', frame:'lisa/0004.png' }
        ],
        frameRate: 16,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lily_animation',
        frames: [
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0001.png' },
            { key:'spritesheets', frame:'lily/0002.png' },
            { key:'spritesheets', frame:'lily/0003.png' },
            { key:'spritesheets', frame:'lily/0004.png' },
            { key:'spritesheets', frame:'lily/0005.png' },
            { key:'spritesheets', frame:'lily/0006.png' },
            { key:'spritesheets', frame:'lily/0006.png' },
            { key:'spritesheets', frame:'lily/0006.png' },
            { key:'spritesheets', frame:'lily/0006.png' },
            { key:'spritesheets', frame:'lily/0006.png' },
            { key:'spritesheets', frame:'lily/0006.png' },
            { key:'spritesheets', frame:'lily/0006.png' },
            { key:'spritesheets', frame:'lily/0006.png' },
            { key:'spritesheets', frame:'lily/0005.png' },
            { key:'spritesheets', frame:'lily/0004.png' },
            { key:'spritesheets', frame:'lily/0003.png' },
            { key:'spritesheets', frame:'lily/0002.png' },
            { key:'spritesheets', frame:'lily/0001.png' }
        ],
        frameRate: 16,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'lucy_animation',
        frames: [
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0001.png' },
            { key:'spritesheets', frame:'lucy/0002.png' },
            { key:'spritesheets', frame:'lucy/0003.png' },
            { key:'spritesheets', frame:'lucy/0004.png' },
            { key:'spritesheets', frame:'lucy/0005.png' },
            { key:'spritesheets', frame:'lucy/0006.png' }
        ],
        frameRate: 13,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lola_animation',
        frames: [
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/001.png' },
            { key:'spritesheets', frame:'lola/001.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/001.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/001.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/002.png' },
            { key:'spritesheets', frame:'lola/003.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/003.png' },
            { key:'spritesheets', frame:'lola/002.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/002.png' },
            { key:'spritesheets', frame:'lola/003.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/004.png' },
            { key:'spritesheets', frame:'lola/003.png' },
            { key:'spritesheets', frame:'lola/002.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' },
            { key:'spritesheets', frame:'lola/000.png' }
        ],
        frameRate: 12,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'lana_animation',
        frames: [
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/001.png' },
            { key:'spritesheets', frame:'lana/002.png' },
            { key:'spritesheets', frame:'lana/003.png' },
            { key:'spritesheets', frame:'lana/005.png' },
            { key:'spritesheets', frame:'lana/004.png' },
            { key:'spritesheets', frame:'lana/006.png' },
            { key:'spritesheets', frame:'lana/005.png' },
            { key:'spritesheets', frame:'lana/004.png' },
            { key:'spritesheets', frame:'lana/003.png' },
            { key:'spritesheets', frame:'lana/004.png' },
            { key:'spritesheets', frame:'lana/006.png' },
            { key:'spritesheets', frame:'lana/005.png' },
            { key:'spritesheets', frame:'lana/004.png' },
            { key:'spritesheets', frame:'lana/003.png' },
            { key:'spritesheets', frame:'lana/004.png' },
            { key:'spritesheets', frame:'lana/006.png' },
            { key:'spritesheets', frame:'lana/005.png' },
            { key:'spritesheets', frame:'lana/004.png' },
            { key:'spritesheets', frame:'lana/003.png' },
            { key:'spritesheets', frame:'lana/002.png' },
            { key:'spritesheets', frame:'lana/001.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' },
            { key:'spritesheets', frame:'lana/000.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'lynn_animation',
        frames: [
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/002.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/003.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/001.png' },
            { key:'spritesheets', frame:'lynn/003.png' },
            { key:'spritesheets', frame:'lynn/004.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/005.png' },
            { key:'spritesheets', frame:'lynn/004.png' },
            { key:'spritesheets', frame:'lynn/003.png' },
            { key:'spritesheets', frame:'lynn/001.png' },

        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'luan_animation',
        frames: [
            { key:'spritesheets', frame:'luan/001.png' },
            { key:'spritesheets', frame:'luan/001.png' },
            { key:'spritesheets', frame:'luan/001.png' },
            { key:'spritesheets', frame:'luan/001.png' },
            { key:'spritesheets', frame:'luan/002.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/002.png' },
            { key:'spritesheets', frame:'luan/001.png' },
            { key:'spritesheets', frame:'luan/001.png' },
            { key:'spritesheets', frame:'luan/001.png' },
            { key:'spritesheets', frame:'luan/001.png' },
            { key:'spritesheets', frame:'luan/002.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/004.png' },
            { key:'spritesheets', frame:'luan/005.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/007.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/007.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/007.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/007.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/007.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/007.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/007.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/007.png' },
            { key:'spritesheets', frame:'luan/006.png' },
            { key:'spritesheets', frame:'luan/005.png' },
            { key:'spritesheets', frame:'luan/004.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/003.png' },
            { key:'spritesheets', frame:'luan/002.png' },
            { key:'spritesheets', frame:'luan/001.png' }
        ],
        frameRate: 12,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'luna_animation',
        frames: [
            { key:'spritesheets', frame:'luna/002.png' },
            { key:'spritesheets', frame:'luna/003.png' },
            { key:'spritesheets', frame:'luna/004.png' },
            { key:'spritesheets', frame:'luna/005.png' },
            { key:'spritesheets', frame:'luna/005.png' },
            { key:'spritesheets', frame:'luna/005.png' },
            { key:'spritesheets', frame:'luna/004.png' },
            { key:'spritesheets', frame:'luna/003.png' },
            { key:'spritesheets', frame:'luna/002.png' },
            { key:'spritesheets', frame:'luna/003.png' },
            { key:'spritesheets', frame:'luna/004.png' },
            { key:'spritesheets', frame:'luna/003.png' },
            { key:'spritesheets', frame:'luna/002.png' },
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'leni_animation',
        frames: [
            { key:'spritesheets', frame:'leni/0001.png' },
            { key:'spritesheets', frame:'leni/0002.png' },
            { key:'spritesheets', frame:'leni/0003.png' },
            { key:'spritesheets', frame:'leni/0004.png' },
            { key:'spritesheets', frame:'leni/0005.png' },
            { key:'spritesheets', frame:'leni/0006.png' },
            { key:'spritesheets', frame:'leni/0007.png' },
            { key:'spritesheets', frame:'leni/0008.png' },
            { key:'spritesheets', frame:'leni/0009.png' },
            { key:'spritesheets', frame:'leni/0010.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0011.png' },
            { key:'spritesheets', frame:'leni/0010.png' },
            { key:'spritesheets', frame:'leni/0009.png' },
            { key:'spritesheets', frame:'leni/0008.png' },
            { key:'spritesheets', frame:'leni/0007.png' },
            { key:'spritesheets', frame:'leni/0006.png' },
            { key:'spritesheets', frame:'leni/0005.png' },
            { key:'spritesheets', frame:'leni/0004.png' },
            { key:'spritesheets', frame:'leni/0003.png' },
            { key:'spritesheets', frame:'leni/0002.png' },
            { key:'spritesheets', frame:'leni/0001.png' },
            { key:'spritesheets', frame:'leni/0001.png' },
            { key:'spritesheets', frame:'leni/0001.png' },
            { key:'spritesheets', frame:'leni/0001.png' },
            { key:'spritesheets', frame:'leni/0001.png' },
            { key:'spritesheets', frame:'leni/0001.png' },
            { key:'spritesheets', frame:'leni/0001.png' },
            { key:'spritesheets', frame:'leni/0001.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);




    config = {
        key: 'charles_animation',
        frames: [
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/001.png' },
            { key:'spritesheets', frame:'charles/002.png' },
            { key:'spritesheets', frame:'charles/003.png' },
            { key:'spritesheets', frame:'charles/004.png' },
            { key:'spritesheets', frame:'charles/004.png' },
            { key:'spritesheets', frame:'charles/004.png' },
            { key:'spritesheets', frame:'charles/004.png' },
            { key:'spritesheets', frame:'charles/004.png' },
            { key:'spritesheets', frame:'charles/004.png' },
            { key:'spritesheets', frame:'charles/005.png' },
            { key:'spritesheets', frame:'charles/005.png' },
            { key:'spritesheets', frame:'charles/005.png' }
        ],
        frameRate: 11,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'cliff_animation',
        frames: [
            { key:'spritesheets', frame:'cliff/001.png' },
            { key:'spritesheets', frame:'cliff/001.png' },
            { key:'spritesheets', frame:'cliff/001.png' },
            { key:'spritesheets', frame:'cliff/001.png' },
            { key:'spritesheets', frame:'cliff/001.png' },
            { key:'spritesheets', frame:'cliff/001.png' },
            { key:'spritesheets', frame:'cliff/001.png' },
            { key:'spritesheets', frame:'cliff/001.png' },
            { key:'spritesheets', frame:'cliff/002.png' },
            { key:'spritesheets', frame:'cliff/002.png' },
            { key:'spritesheets', frame:'cliff/002.png' },
            { key:'spritesheets', frame:'cliff/002.png' },
            { key:'spritesheets', frame:'cliff/002.png' },
            { key:'spritesheets', frame:'cliff/003.png' },
            { key:'spritesheets', frame:'cliff/004.png' },
            { key:'spritesheets', frame:'cliff/004.png' },
            { key:'spritesheets', frame:'cliff/004.png' },
            { key:'spritesheets', frame:'cliff/004.png' },
            { key:'spritesheets', frame:'cliff/004.png' },
            { key:'spritesheets', frame:'cliff/004.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'geo_animation',
        frames: [
            { key:'spritesheets', frame:'geo/001.png' },
            { key:'spritesheets', frame:'geo/002.png' },
            { key:'spritesheets', frame:'geo/003.png' },
            { key:'spritesheets', frame:'geo/004.png' },
            { key:'spritesheets', frame:'geo/005.png' },
            { key:'spritesheets', frame:'geo/006.png' },
            { key:'spritesheets', frame:'geo/007.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'walt_animation',
        frames: [
            { key:'spritesheets', frame:'walt/001.png' },
            { key:'spritesheets', frame:'walt/002.png' },
            { key:'spritesheets', frame:'walt/003.png' },
            { key:'spritesheets', frame:'walt/005.png' },
            { key:'spritesheets', frame:'walt/004.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'izzy_animation',
        frames: [
            { key:'spritesheets', frame:'izzy/001.png' },
            { key:'spritesheets', frame:'izzy/002.png' },
            { key:'spritesheets', frame:'izzy/003.png' },
            { key:'spritesheets', frame:'izzy/004.png' },
            { key:'spritesheets', frame:'izzy/004.png' },
            { key:'spritesheets', frame:'izzy/004.png' },
            { key:'spritesheets', frame:'izzy/004.png' },
            { key:'spritesheets', frame:'izzy/004.png' },
            { key:'spritesheets', frame:'izzy/004.png' },
            { key:'spritesheets', frame:'izzy/004.png' },
            { key:'spritesheets', frame:'izzy/004.png' },
            { key:'spritesheets', frame:'izzy/004.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'fangs_animation',
        frames: [
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/002.png' },
            { key:'spritesheets', frame:'fangs/003.png' },
            { key:'spritesheets', frame:'fangs/002.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/002.png' },
            { key:'spritesheets', frame:'fangs/003.png' },
            { key:'spritesheets', frame:'fangs/002.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' },
            { key:'spritesheets', frame:'fangs/001.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'lure_animation',
        frames: [
            { key:'spritesheets', frame:'lizardlure/001.png' },
            { key:'spritesheets', frame:'lizardlure/002.png' },
            { key:'spritesheets', frame:'lizardlure/003.png' },
            { key:'spritesheets', frame:'lizardlure/004.png' },
            { key:'spritesheets', frame:'lizardlure/005.png' },
            { key:'spritesheets', frame:'lizardlure/006.png' },
            { key:'spritesheets', frame:'lizardlure/007.png' },
            { key:'spritesheets', frame:'lizardlure/008.png' },
            { key:'spritesheets', frame:'lizardlure/009.png' },
            { key:'spritesheets', frame:'lizardlure/010.png' },
            { key:'spritesheets', frame:'lizardlure/011.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'fountain_animation',
        frames: [
            { key:'spritesheets', frame:'fountain_on/001.png' },
            { key:'spritesheets', frame:'fountain_on/002.png' },
            { key:'spritesheets', frame:'fountain_on/003.png' }
        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);


    config = {
        key: 'leak_animation',
        frames: [
            { key:'spritesheets', frame:'fountain_leak/001.png' },
            { key:'spritesheets', frame:'fountain_leak/002.png' },
            { key:'spritesheets', frame:'fountain_leak/003.png' },
            { key:'spritesheets', frame:'fountain_leak/004.png' },
            { key:'spritesheets', frame:'fountain_leak/005.png' },
            { key:'spritesheets', frame:'fountain_leak/003.png' },
            { key:'spritesheets', frame:'fountain_leak/004.png' },
            { key:'spritesheets', frame:'fountain_leak/002.png' },
            { key:'spritesheets', frame:'fountain_leak/004.png' },
            { key:'spritesheets', frame:'fountain_leak/005.png' },
            { key:'spritesheets', frame:'fountain_leak/004.png' },
            { key:'spritesheets', frame:'fountain_leak/005.png' },
            { key:'spritesheets', frame:'fountain_leak/003.png' },
            { key:'spritesheets', frame:'fountain_leak/004.png' },
            { key:'spritesheets', frame:'fountain_leak/005.png' },
            { key:'spritesheets', frame:'fountain_leak/003.png' },
            { key:'spritesheets', frame:'fountain_leak/004.png' },
            { key:'spritesheets', frame:'fountain_leak/002.png' }

        ],
        frameRate: 14,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'static_animation',
        frames: [
            { key:'spritesheets', frame:'static/001.png' },
            { key:'spritesheets', frame:'static/002.png' },
            { key:'spritesheets', frame:'static/003.png' }
        ],
        frameRate: 12,
        repeat: -1
    };
    scene.anims.create(config);
}
