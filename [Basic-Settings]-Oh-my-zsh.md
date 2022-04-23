기본 리눅스 쉘인 `bash` 보다 조금 더 사용성이 좋은 `Oh My Zsh`를 설치하는 방법을 간략하게 정리해놓은 글입니다.

## 1. Oh My Zsh 설치
- zsh 버전 확인
    ```    
    $ zsh --version // 버전 체크
    ```
   > 위 명령어로 설치 된 버전이 없다는 것이 확인되면 zsh 설치를 진행한다.
- 설치는 다음을 따른다.
    ```
    $ sudo apt install zsh
    ```
    > apt 명령어를 자세히 알고 싶다면 리눅스 터미널에서 man apt 을 입력.
    `advanced packaging tool, apt`는 리눅스에서 소프트웨어를 설치하고 제거 하는 일을 담당(데비안 계열 한정)
    ```
    $ chsh -s `which zsh` // 아래 명령어 두 개를 합친 방법

    $ which zsh // 쉘 위치 확인
    /usr/bin/zsh

    $ chsh -s /usr/bin/zsh // 기본 쉘을 zsh로 변경한다.
    ```
    > 현재 사용중인 쉘을 확인하려면 `grep [username] /etc/passwd` 로 확인이 가능하다.
    ```
    $ curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
    ```
    간단하게 설치하면 된다. 설치하는 과정에서 이미 `.oh-my-zsh` 를 설치한 적이 있다면, 설치가 정상적으로 진행되지 않을 수 있다.
    이럴 때는 `rm -rf /home/[username]/.oh-my-zsh` 로 폴더를 삭제하고 다시 설치해본다.
    이제 `Oh-My-Zsh`의 기능을 사용할 수 있다. :)

## 2. 이제 테마를 설치해보자.
- 우선 테마를 골라보자.
    > https://github.com/ohmyzsh/ohmyzsh/wiki/Themes

    위와 같은 사이트도 꽤 있고, 다양한 테마가 존재한다. 그리고 각 테마의 github 에서 설치 정보를 제공한다.

- `powerlevel9k` 를 선택하였다 테마를 설치해보자
    > https://github.com/Powerlevel9k/powerlevel9k 페이지로 접근하면 자세하게 설치 방법이 나온다.

## 3. 마무리
- 테마를 선택하는 것은 본인이 원하는대로 하는게 좋다. 본인이 눈이 덜 피로한 색으로 찾아서 사용하면 된다.
설치과정에서문제가 있다면 issue를 확인해보는 것도 좋다.

## 간헐적인 문제 해결
- [만약 특정 터미널에서 ?와 같이 이상한 아이콘이 노출된다면..?](https://medium.com/@cloverinks/oh-my-zsh-agnoster-theme-not-showing-correct-font-on-vscode-ubuntu-47b5e8dcbada)

## reference
- [터미널 초보의 필수품인 Oh-My-Zsh...](https://nolboo.kim/blog/2015/08/21/oh-my-zsh/)
- [powerlevel9k 를 설치하고싶다면..?](https://github.com/Powerlevel9k/powerlevel9k/wiki/Install-Instructions#step-1-install-powerlevel9k)