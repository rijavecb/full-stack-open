title 0.6: New note

note over browser:
After the user creates a new note and clicks on the
"Save" button, the browser doesn't submit the form
in a traditional way as the form is missing "action" and
"method" attributes. Instead, it uses JavaScript to handle
the form submission, sending the note in JSON format.
It also redraws the notes before sending the data.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa Content-type: application/json

note over server:
Server receives the data and responds with status code 201 created
end note

server-->browser: 201 Created { message: "note created" }
