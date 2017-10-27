<?php
require __DIR__ . '/vendor/autoload.php';
$configuration = require_once __DIR__ . '/configuration.php';

$content = file_get_contents('php://input');
$update = json_decode($content, true);

if(!$update) {
    exit;
}

$message = $update['message'] ?? [];
$messageId = $message['message_id'] ?? '';
$chatId = $message['chat']['id'] ?? '';
$username = $message['chat']['username'] ?? '';
$text = $message['text'] ?? '';

if(!in_array($username, $configuration['allowedUsernames'])) {
    exit;
}

$text = trim($text);
$text = strtolower($text);
header('Content-Type: application/json');

$response = '';

$pnConfig = new PubNub\PNConfiguration();
$pnConfig->setSubscribeKey($configuration['subscribeKey']);
$pnConfig->setPublishKey($configuration['publishKey']);

$pubnub = new PubNub\PubNub($pnConfig);
$logger = new Monolog\Logger('null', [new Monolog\Handler\NullHandler()]);
$pubnub->setLogger($logger);

if(strpos($text, '/start') === 0) {
    $response = 'Welcome to reveal.js Remote Control Bot';
} else if($text && in_array($text, $configuration['allowedActions'], false)) {
    $response = sprintf('@%s %s', $username, $text);
    $pubnub->publish()
        ->channel($configuration['inputChannel'])
        ->message(['button' => $text])
        ->sync();

} else {
    $response = 'Wrong message';
}

echo json_encode([
    'chat_id' => $chatId,
    'text' => $response,
    'method' => 'sendMessage',
    'reply_markup' => [
        'keyboard' => [['LEFT', 'RIGHT'], ['UP', 'DOWN']],
        'one_time_keyboard' => false,
        'resize_keyboard' => false,
    ]
]);
