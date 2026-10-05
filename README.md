# Academia Vida

Site institucional responsivo da Academia Vida. Paleta baseada na logo enviada: vermelho, preto e branco. HTML, CSS e JavaScript, sem dependências de build.

## Executar

Sirva a pasta do site com qualquer servidor estático. Exemplo: `python -m http.server 8080`.

## Conteúdo

- Abertura, apresentação, objetivos de treino com abas, etapas para começar, FAQ e contato pelo Instagram.
- Menu mobile, navegação por teclado, preferência por movimento reduzido, mensagens editáveis e cópia para o clipboard.
- Instagram informado pelo cliente: https://www.instagram.com/vida.academia/
- O contato não envia mensagens automaticamente. O visitante copia a mensagem e a envia pelo Instagram.
- Fotografias ilustrativas; não são fotos das instalações reais. Substituir por imagens fornecidas pela academia quando disponíveis.
- Preços, endereço, horários, modalidades e estatísticas não foram inventados. As dúvidas operacionais encaminham à equipe.
- Sem backend, matrícula, pagamentos ou área do aluno.

## Imagens e fontes

Logo fornecida pelo usuário.

Fotografia principal: Anastase Maragos / Unsplash
https://unsplash.com/photos/shirtless-man-lifting-barbell-in-gym-9dzWZQWZMdE
https://images.unsplash.com/photo-1605296867304-46d5465a13f1

Fotografia secundária: Marvin Cors / Unsplash
https://unsplash.com/photos/a-man-lifting-a-barbell-in-a-gym-1kjau9difys
https://images.unsplash.com/photo-1682530678145-daa4241f8de4

Fotos disponibilizadas sob licença Unsplash: https://unsplash.com/license

Fontes: Barlow Condensed e Manrope, via Google Fonts, SIL Open Font License.


## Edição de movimento — outubro de 2026

Referência de dinâmica visual: Buckler Fit. Implementação própria para Academia Vida.

- Vídeo de treino local em loop, sem áudio; imagem estática de fallback.
- Hero sticky, zoom durante a rolagem, transição da apresentação sobre o hero.
- Revelação sequencial dos títulos, preenchimento de texto pela rolagem, faixa tipográfica contínua.
- Parallax da fotografia, cartões empilhados, troca de objetivos animada.
- Botões magnéticos e acompanhamento discreto do cursor somente para mouse.
- Palavra VIDA no rodapé com iluminação que acompanha o ponteiro.
- Pausa manual, respeito a prefers-reduced-motion, vídeo suspenso fora da tela e em aba oculta.
- Rolagem nativa, sem dependência de CDN ou bibliotecas externas. Arquivo motion.js concentra os efeitos.

Vídeo ilustrativo: Mixkit — Man lifting weights in the gym (100544).
https://mixkit.co/free-stock-video/man-lifting-weights-in-the-gym-100544/
Licença Stock Video Free, uso pessoal/comercial: https://mixkit.co/license/
Arquivo original: https://assets.mixkit.co/active_storage/video_items/100544/1725385028/100544-video-720.mp4
13,18 segundos, 1280 x 720, sem áudio. Não é filmagem da Academia Vida.
