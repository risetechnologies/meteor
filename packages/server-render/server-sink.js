export class ServerSink {
  constructor(request, arch) {
    this.request = request;
    this.arch = arch;
    this.head = "";
    this.body = "";
    this.htmlById = Object.create(null);
    this.maybeMadeChanges = false;
  }

  appendToHead(html) {
    if (appendContent(this, "head", html)) {
      this.maybeMadeChanges = true;
    }
  }

  appendToBody(html) {
    if (appendContent(this, "body", html)) {
      this.maybeMadeChanges = true;
    }
  }

  appendToElementById(id, html) {
    if (appendContent(this.htmlById, id, html)) {
      this.maybeMadeChanges = true;
    }
  }

  renderIntoElementById(id, html) {
    this.htmlById[id] = "";
    this.appendToElementById(id, html);
  }

  redirect(code, location) {
    
  }

  // server only methods
  setStatusCode(code) {
    
  }

  getHeaders() {
    
  }
}

export function isReadable(stream) {
  return (
    stream !== null &&
    typeof stream === 'object' &&
    typeof stream.pipe === 'function' &&
    stream.readable !== false &&
    typeof stream._read === 'function' &&
    typeof stream._readableState === 'object'
  );
}

function appendContent(object, property, content) {
  let madeChanges = false;

  if (Array.isArray(content)) {
    content.forEach(elem => {
      if (appendContent(object, property, elem)) {
        madeChanges = true;
      }
    });
  } else if (isReadable(content)) {
    object[property] = content;
    madeChanges = true;
  } else if ((content = content && content.toString("utf8"))) {
    object[property] = (object[property] || "") + content;
    madeChanges = true;
    // should we join streams here?
  } 
  return madeChanges;
}
