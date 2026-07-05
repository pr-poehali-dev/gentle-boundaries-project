import json
import os
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText


def send_email(name: str, contact: str, program: str, message: str) -> None:
    sender = 'ekaterinaa11@list.ru'
    password = os.environ.get('SMTP_PASSWORD', '')

    body = f'Новая заявка с сайта\n\nИмя: {name}\nКонтакт: {contact}\n'
    if program:
        body += f'Программа: {program}\n'
    if message:
        body += f'Сообщение: {message}\n'

    msg = MIMEText(body, 'plain', 'utf-8')
    msg['Subject'] = f'Новая заявка с сайта от {name}'
    msg['From'] = sender
    msg['To'] = sender

    with smtplib.SMTP_SSL('smtp.list.ru', 465, timeout=10) as server:
        server.login(sender, password)
        server.sendmail(sender, [sender], msg.as_string())


def handler(event: dict, context) -> dict:
    '''Принимает заявку с сайта и отправляет её в Telegram и на почту эксперту.'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = str(body.get('name', '')).strip()
    contact = str(body.get('contact', '')).strip()
    program = str(body.get('program', '')).strip()
    message = str(body.get('message', '')).strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите имя и контакт'}, ensure_ascii=False),
        }

    token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')

    text = (
        '✨ Новая заявка с сайта\n\n'
        f'👤 Имя: {name}\n'
        f'📞 Контакт: {contact}\n'
    )
    if program:
        text += f'💫 Программа: {program}\n'
    if message:
        text += f'💬 Сообщение: {message}\n'

    tg_url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = urllib.parse.urlencode({'chat_id': chat_id, 'text': text}).encode()
    req = urllib.request.Request(tg_url, data=data, method='POST')

    with urllib.request.urlopen(req, timeout=10) as resp:
        resp.read()

    send_email(name, contact, program, message)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'ok': True}, ensure_ascii=False),
    }