# DS4 Stock Checker

DualShock4 の在庫状況をスクレイピングするスクリプト

## Using Packages

Puppeteer
https://puppeteer.github.io/puppeteer/

Prettier
https://prettier.io/

## How To Use

type command line
```
yarn start
```

## Result Preview

![image](https://user-images.githubusercontent.com/15998572/174777090-d4d45888-4885-4688-8602-dd061fc62a81.png)

## Road map

- [ ] 要素がない場合に3000msで終了してほしいのに、30000ms丁寧に待ってしまう問題の解決

puppeteerの仕様を読み込んで対処 or 遅い場合にpromiseから除外する

…他要望あれば実装します。

## Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation
