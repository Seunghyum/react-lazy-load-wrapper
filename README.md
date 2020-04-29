# react-lazy-load-wrapper

Intersection Observer API wrapping by React Class Component & Hooks

## 기능

- reusing instance : LazyLoadObserver클래스에서 Intersection Observer를 label props로 하나로 관리 가능
- stateful component : LazyLoadObserver클래스의 obCallback (state)에서는 LazyLoadWrapper의 isVisible state를 업데이트하여 LazyLoadWrapper안의 children을 동적으로 로딩할지 여부를 결정하게 함.
- 

## 전제 조건

- LazyLoadWrapper 컴퍼넌트가 들어가는 DOM의 height값은 고정값어야함.

```css
/* example */
.lazy-load-wrapper {
  height: 400px;
}
```

## 사용법

| prop name     | type                                      |                        default                            | optional |
|---------------|-------------------------------------------|-----------------------------------------------------------|----------|
| isTriggerOnce | Boolean                                   |                          false                            |     O    |
| target        | DOMNode                                   |                 null (window, document)                   |     O    |
| label         | string                                    |                          null                             |     O    |
| options       | IntersectionObserver API Options : Object | {root: null, threshold: 0, rootMargin: '0px 0px 0px 0px'} |     O    |

### options prop default value 

```json
{ "root": null, "rootMargin": "0px 0px 0px 0px", "threshold": 0 }
```

### Example

```javascript
const defaultOptions = { root: null, rootMargin: '0px 0px 0px 0px', threshold: 0 }

<LazyLoadWrapper key={index} label={BG_IMG} target={ref.current} options={defaultOptions} isTriggerOnce>
  <img src={img} alt="" />
</LazyLoadWrapper>
```

## 실행

### 개발모드

```SHELL
// hooks
$ yarn hooks:dev

// class
$ yarn class:dev
```
