title 0.4: New note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over server:
server processes the received note adding it to the array
and responds with HTTP status code 302
end note

server-->browser: 302 Found - location: /exampleapp/notes

note over browser:
browser is asked to make a HTTP GET request
to the address defined in the header's Location  
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
