import asyncio, socket, os

files = os.listdir("files")

HOST = ('localhost', 65432)

help_msg = """~~ Command Help ~~
  ls - list files
  cat - read file
  help - show this message
  exit - disconnect"""

def log(addr, *args):
    print("[%s:%s]" % addr, *args)

async def handle_client(client):
    try:
        loop = asyncio.get_event_loop()
        running = True

        addr = client.getpeername()
        log(addr, "Connected")

        while running:
            await loop.sock_sendall(client, "user@netcat-server ~ $ ".encode("utf8"))

            request = (await loop.sock_recv(client, 255)).decode('utf8').replace("\n","").replace("\r","").lower()

            response = "nuh uh (try help)"
            cmd = request.split(" ")[0]

            log(addr, "MSG: " + request)

            if cmd == "help":
                response = help_msg

            if cmd == "ls" or cmd == "dir":
                response = "\n".join(files)
            
            if cmd == "exit":
                response = "Goodbye!"
                running = False

            if cmd == "cat" or cmd == "open" or cmd == "read":
                split = request.split(" ")
                if len(split) <= 1:
                    response = "Unknown file"
                else:
                    file = " ".join(split[1:])
                    found = False

                    for f in files:
                        if f.lower() == file.lower():
                            response = open("files/" + f, "r").read()
                            found = True
                    
                    if not found:
                        response = "Unknown file"

            await loop.sock_sendall(client, (response + "\n").encode('utf8'))

        client.close()
        log(addr, "Disconnected")
    except Exception as e:
        log(addr, "Error", e)
        print("Terminated connection")

async def run_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(HOST)
    server.listen(8)
    server.setblocking(False)

    loop = asyncio.get_event_loop()

    print("Listening at " + repr(HOST))

    while True:
        client, _ = await loop.sock_accept(server)
        loop.create_task(handle_client(client))

asyncio.run(run_server())