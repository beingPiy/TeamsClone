import helpers from './methods.js';


window.addEventListener( 'load', () => {
    // Whenever chat icon is clicked chat-bar will open
    document.querySelector( '#pop-chat-bar' ).addEventListener( 'click', ( e ) => {
        // store the chat elements and all messages that come in main section
        let chatElem = document.querySelector( '#chat-bar' );
        let mainSecElem = document.querySelector( '#primary-section' );

        // add messages in chat-bar, adjust the color according to user
        if ( chatElem.classList.contains( 'active-chat' ) ) {
            chatElem.setAttribute( 'hidden', true );
            mainSecElem.classList.remove( 'col-md-9' );
            mainSecElem.classList.add( 'col-md-12' );
            chatElem.classList.remove( 'active-chat' );
        }

        else {
            chatElem.attributes.removeNamedItem( 'hidden' );
            mainSecElem.classList.remove( 'col-md-12' );
            mainSecElem.classList.add( 'col-md-9' );
            chatElem.classList.add( 'active-chat' );
        }

        //remove the New badge on chat icon after chat is opened
        setTimeout( () => {
            if ( document.querySelector( '#chat-bar' ).classList.contains( 'active-chat' ) ) {
                helpers.changeNotificationStatus();
            }
        }, 300 );
    } );


    // Enable picture in picture mode once video is clicked
    document.getElementById( 'local' ).addEventListener( 'click', () => {
        if ( !document.pictureInPictureElement ) {
            document.getElementById( 'local' ).requestPictureInPicture()
                .catch( err => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error( err );
                } );
        }

        else {
            document.exitPictureInPicture()
                .catch( err => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error( err );
                } );
        }
    } );

    


    // Once Create room button clicked
    document.getElementById( 'build-conference-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        // fetch the room name given
        let roomData = document.querySelector( '#room-name' ).value;

        // fetch users name
        let userData = document.querySelector( '#your-name' ).value;

        // if both entries are valid
        if ( roomData && userData ) {

            // firstly remove any error message if occured previously
            document.querySelector( '#err-msg' ).innerHTML = "";

            //  preserve the username in session storage space
            sessionStorage.setItem( 'username', userData );

            //create room link
            let roomLink = `${ location.origin }?room=${ roomData.trim().replace( ' ', '_' ) }_${ helpers.generateRandomString() }`;
            let postTitle = 'Enter Meet with link'

            //show message with link to room
            document.querySelector( '#room-created' ).innerHTML = `

                    <a href="https://wa.me/?text=${postTitle} ${roomLink}" class="whatsapp-btn" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    </a>

                    <a href="https://facebook.com/sharer.php?u=${roomLink}" class="facebook-btn" target="_blank">
                    <i class="fab fa-facebook"></i>
                    </a>
            
                    <a href="https://twitter.com/share?url=${roomLink}&text=${postTitle}" class="twitter-btn" target="_blank">
                    <i class="fab fa-twitter"></i>
                    </a>
            
            
                    <a href="${roomLink}" class="btn btn-block rounded-0 shade1">Enter Room</a>
                      
                    `;

            //empty the values
            document.querySelector( '#room-name' ).value = '';
            document.querySelector( '#your-name' ).value = '';
        }

        else {
            document.querySelector( '#err-msg' ).innerHTML = "All fields are mandatory";
        }
    } );


    //  When Enter room button from left dialogue box clicked
    document.getElementById( 'enter-room' ).addEventListener( 'click', ( e ) => {
        e.preventDefault();

        // fetch username and store in the name variable 
        let name = document.querySelector( '#username' ).value;

        if ( name ) {
            // if any error message occured previously remove it
            document.querySelector( '#err-msg-username' ).innerHTML = "";

            //preserve user name in session storage space
            sessionStorage.setItem( 'username', name );

            // again load the room
            location.reload();
        }

        // if invalid(empty) entry for name, show error message
        else {
            document.querySelector( '#err-msg-username' ).innerHTML = "Please input your name";
        }
    } );

    // in remote video there will be two icons in bottom of video
    // one to expand the video in full screen
    // second to mute the mic of that remote person
    document.addEventListener( 'click', ( e ) => {
        if ( e.target && e.target.classList.contains( 'expand-remote-video' ) ) {
            helpers.maximiseStream( e );
        }

        else if ( e.target && e.target.classList.contains( 'mute-remote-mic' ) ) {
            helpers.singleStreamToggleMute( e );
        }
    } );

    // closes the record screen and record self stream dialogue box
    document.getElementById( 'closeModal' ).addEventListener( 'click', () => {
        helpers.toggleModal( 'recording-options-modal', false );
    } );
} );
