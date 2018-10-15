const template = `<div id="gallery"></div>
        <div class="view-more">
            <input type="button" class="view-more-button bold" value="View more" /></div>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="controls-wrapper">
                    <div class="controls controls-back"></div>
                </div>
                <div class="modal-image"><img src="" alt=""></div>
                <div class="modal-description">
                    <div class="header">
                        <div class="avatar"><img class="image-avatar" src="" alt="">
                        </div>
                        <div class="username bold"><a href="#"><span class='span-username'></span></a> &bull; <a href="#">Follow</a><br />
                            <span class="location regular"></span></div>
                    </div>
                    <div class="description">
                        <a href="#"><span class="span-username bold"></span></a> <span class="span-description"></span></div>
                    <div class="modal-description-likes bold"></div>

                    <div class="modal-description-input">
                        <input type="text" placeholder="Add a comment...">
                    </div>
                </div>
                <div class="controls-wrapper">
                    <div class="controls controls-forward"></div>
                </div>
            </div>
            <span class="close bold">&times;</span>
        </div>`;

let imagePosition = 0,
    index = 0,
    loaded = 0,
    data = {};

const showPopUp = index => {

    if (index === 0) {
        $('.controls-back').css('display', 'none');
        $('.controls-forward').css('display', 'block');
    } else if (index === loaded - 1) {
        $('.controls-forward').css('display', 'none');
        $('.controls-back').css('display', 'block');
    } else {
        $('.controls-back').css('display', 'block');
        $('.controls-forward').css('display', 'block');
    }

    $('.modal-image').children('img').attr('src', data.media[index].display_url);
    $('.avatar').children('img').attr('src', data.profile_pic_url);
    $('.span-username').html(data.username);
    $('.location').html(data.media[index].location);

    if (data.media[index].location !== '') {
        $('.username').css('padding-top', '5px');
    } else {
        $('.username').css('padding-top', '10px');
    }

    $('.span-description').html(data.media[index].edge_media_to_caption.replace(/#(\w+)/gm, '<a href="#">#$1</a>'));
    $('.modal-description-likes').html(`${data.media[index].edge_liked_by.count} likes`);

    $('#myModal').css('display', 'block');
};


const loadImages = count => {
    for (let i = 0; i < count; i++) {

        if (imagePosition >= data.media.length) {
            $('.view-more-button').css('display', 'none');
            break;
        }

        $('#gallery').append(`<div class="image">
        <img id="${data.media[imagePosition].id}" src="${data.media[imagePosition].display_url}" alt="">
        <div class="hover-shadow">
            <div class="hover-content">
                <div class="likes">
                    <div class="likes-icon"></div>
                    <div class="likes-count bold">${data.media[imagePosition].edge_liked_by.count}</div>
                </div>
                <div class="comments">
                    <div class="comments-icon"></div>
                    <div class="comments-count bold">${data.media[imagePosition].edge_media_to_comment.count}</div>
                </div>
            </div>
        </div>
    </div>`);

        imagePosition++;
        loaded++;
    }
};

const makeSquareImages = () => {
    $('.image').height($('img').width());
};

$(document).ready(() => {
    $('#container').html(template);
    $.ajax({
        url: './data/media.json',
        dataType: 'json',
        success: (json) => {
            data = json;
            loadImages(12);
        }
    }).done(() => {
        makeSquareImages();
        $('.view-more-button').css('display', 'block');
    });
});

$(window).resize(event => {
    makeSquareImages();
    event.preventDefault();
});

$(window).on('click', event => {
    if (event.target.className === 'modal') {
        $('#myModal').css('display', 'none');
    }
    event.preventDefault();
});

$(document).on('click', '.image', event => {
    index = parseInt($(event.target).closest('.image').children('img').attr('id'));
    showPopUp(index);
    event.preventDefault();
});

$(document).on('click', '.view-more-button', event => {
    loadImages(6);
    makeSquareImages();
    event.preventDefault();
});

$(document).on('click', '.close', event => {
    $('#myModal').css('display', 'none');
    event.preventDefault();
});

$(window).on('keydown', event => {
    if (event.keyCode === 27) {
        $('#myModal').css('display', 'none');
    }
    event.preventDefault();
});

$(document).on('click', '.controls-forward', event => {
    showPopUp(++index);
    event.preventDefault();
});

$(document).on('click', '.controls-back', event => {
    showPopUp(--index);
    event.preventDefault();
});