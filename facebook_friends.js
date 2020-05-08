function extractFriends() {
    lines = [];
    document.querySelectorAll('#pagelet_timeline_medley_friends div[data-testid="friend_list_item"]').forEach((nodeEl) => {
        if (nodeEl.firstChild.attributes && 
            nodeEl.firstChild.attributes['data-hovercard'] && 
            nodeEl.firstChild.firstChild && 
            nodeEl.firstChild.firstChild.attributes['aria-label']
           ) {
            name = nodeEl.firstChild.firstChild.attributes['aria-label'].nodeValue;
            id = nodeEl.firstChild.attributes['data-hovercard'].nodeValue.match(/id=\d+/g)[0].substr(3);
            lines.push(name+';'+id);
        }
    });

    var reader = new FileReader();
    var out = new Blob([lines.join("\n")], {type: 'text/csv'});
    reader.onload = function(e){
      window.location.href = reader.result;
    }
    reader.readAsDataURL(out);
}

var trigger = setInterval(function() { 
  if (document.getElementById('pagelet_timeline_medley_music') != null) {
    clearInterval(trigger);
    extractFriends();
  } else {
    window.scrollTo(0, document.body.scrollHeight);
  }
}, 1000);
