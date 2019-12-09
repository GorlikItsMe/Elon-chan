# Elon-chan

Chats with End-to-End Encryption. For everyone!

## Installation

1. Get repo!

```bash
git clone https://github.com/gorlik1337/Elon-chan
```
2. Go into folder!
```bash
cd Elon-chan
```
3. Edit `config.php` and login pass to database!
```bash
nano /api/v1/config.php
```
4. Build tables in database!
In config.php at the end off file you can get sql commands.

## Requirements

1. PHP (I use 7.3 but 5.* should work also)
2. Mysql
3. Apache or Ngnix

## Limitations
* Everyone can pickup your nickname soo create chans ony for your good friends
* You must enable javascript becouse js encrypting and decrypting messages on your device

## TODO
* Login users or something to locking nickname's for one user (PGP?)
* List public chans (and creator of it)
* Dont send whole chat (only last 50 msg, more if you scroll up)

## Why Elon-chan
Becouse I like Elon, Tesla, SpaceX etc. Yes that's all ;-)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)