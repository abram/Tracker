soundManager.url = '/';
soundManager.flashVersion = 9;
soundManager.isMovieStar = true;
soundManager.debugMode = false;
soundManager.autoPlay = true;
soundManager.bufferTime = 5;

soundManager.onload = function() {
  soundManager.play('streamOut', 'http://localhost:8009/');
};

var socket = io.connect('http://localhost:8010');
socket.on('connect', function() {
  console.log('connected!!!')
});

socket.on('message', function (data) {
  console.log(data);
});

socket.on('silenceBegin', function(time, average) {
  console.log("silence begin:", time, average);
  showMessage('');
});

socket.on('silenceEnd', function(time, average) {
  console.log("silence end:", time, average);
  showMessage('Listening to track...');
});

socket.on('wave', function(data) {
  setTimeout(function() {
    addPoint(data.average * 4);
  }, 900);
});

var currentSong = null;
socket.on('song', function(song) {
  if (currentSong && (song.title != currentSong.title)) {
    var div = document.createElement('div');
    div.innerHTML = currentSong.title + ' by ' + currentSong.artist_name + "<a class='trackLink' href='/tracks/" + currentSong.artist_name + ' - ' + currentSong.title + ".mp3'>Download MP3</a>"
    document.getElementById('recent').appendChild(div);
  }
  tag(song);
  currentSong = song;
});

socket.on('songEnd', function(song) {
  console.log("SONG ENDED!!!!");
  hideLyrics();
  split();
});

socket.on('artistImage', function(url) {
  console.log('artist image!', url);
  var current = document.getElementById('current');
  current.style.backgroundImage = "url('" + url + "')";
  current.className = 'track';
});

socket.on('mp3', function(filename) {
  addLink('Download', '/tracks/filename');
});

var LYRICS;
socket.on('lyrics', function(lyrics) {
  LYRICS = lyrics;
  addLink('Lyrics', 'javascript:void(showLyrics());');
});

function showLyrics() {
  var showing = !!document.getElementsByClassName('lyrics').length;
  hideLyrics();
  if (showing) { return; }
  var lines = LYRICS.split(/\n/gmi);
  var top = document.getElementsByClassName('info')[0];
  var header = document.createElement('h3');
  header.innerHTML = 'LYRICS';
  header.className = 'lyrics';
  top.appendChild(header);
  lines.forEach(function(line) {
    var div = document.createElement('div');
    div.innerHTML = line;
    div.className = 'lyrics';
    top.appendChild(div);
  });
};

function hideLyrics() {
  var lyrics = document.getElementsByClassName('lyrics');
  while (lyrics.length) {
    var div = lyrics[0];
    div.parentNode.removeChild(div);
  }

};

function addLink(label, link) {
  var a = document.createElement('a');
  a.className = 'trackLink';
  a.innerHTML = label;
  a.href = link;
  var p = document.getElementsByTagName('p')[0];
  p.insertBefore(a, p.getElementsByTagName('a')[0].nextSibling);
};


      var silent = false;
      var even = false;
      var waveform;
      var template;

      window.onload = function() {
        template = document.body.innerHTML.replace(/<h1>.*<\/h1>/, '');
      }

      function addPoint(value) {
        waveform = document.getElementsByClassName('waveform')[0];
        var points = waveform.getElementsByClassName('point');
        while (points.length >= waveform.offsetWidth) {
          var parent = points[0].parentNode;
          parent.removeChild(points[0]);
          if (!parent.childNodes.length) {
            parent.parentNode.removeChild(parent);
          }
        }

        var div = document.createElement('div');
        div.className = 'point';
        var height = Math.round(90 * value)
        waveform.appendChild(div);

        
        var topBottomSpace = (90 - height) / 2;
        
//        div.style.height = '0px';
        //div.style.width = '2px';
//        div.style.marginLeft = '5px';
        div.style.height = (height || 1)  + 'px';
        div.style.marginTop = topBottomSpace + 'px';
  /*      if (even) {
          // Draw up from bottom.
          div.style.marginTop = topBottomSpace + height;
        } else {
          // Draw down from top.
          div.style.marginTop = topBottomSpace + 'px';
    */    //}
        setTimeout(function() {
      
      //    div.style.width = '1px';
//          div.style.marginLeft = '0px';
        }, 0);
        if (even) setTimeout(function() {

        }, 0)
        even = !even;
      }

      function highlightSilence() {
        var wrapper = document.createElement('div');
        wrapper.className = 'silence';
        var points = waveform.getElementsByClassName('point');
        for (var i = 0; i < 10; i++) {
          wrapper.appendChild(points[points.length - 1]);
        }
        waveform.appendChild(wrapper);
      };

      var counter = 0;
/*      var running = setInterval(function() {
        counter++;
        if (counter / 10 % 5 == 0) {
          silent = true;
        }
        if (counter > 10 && (counter / 10 - 1) % 5 == 0) {
          silent = false;
          highlightSilence();
        }
        addPoint(silent ? 0 : Math.random());
      }, 1000 / 10);
      */

function tag(song) {
  song.title = song.title.replace(/\(Remastered.*\)/, '');
  showMessage('<a>' + song.title + '</a><br>' + 'by <a>' + song.artist_name + '</a>');
 /* (' + song.duration + ')' /* +
  pp    

        '<a href="">Download 320kbs MP3</a> ' +
        '<a href="">Last.fm scrobble</a> ' +
        '<a href="">Spotify playlist</a> ';*/
//    document.getElementsByClassName('recording')[0].innerHTML =
  //      '<img src="http://stream.listeningroom.net/images/trackart_4cab994e23f5bb5802000000.jpg">';
}
 
function showMessage(html) {
  document.getElementsByTagName('p')[0].innerHTML = html;
}
     
      function split() {
        var newDiv = document.createElement('div');
        newDiv.className = 'row';
        newDiv.innerHTML = template;
        var heading = document.getElementsByTagName('h1')[0];
        heading.parentNode.insertBefore(newDiv, heading.nextSibling);
          
      }

function compact() {
  
};
