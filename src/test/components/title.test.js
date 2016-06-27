import Title from '../../main/components/title';

// mockStore and mount are injected in src/test/setup.js

describe('Title', () => {
  it('will render', () => {
    const store = mockStore({ title: 'Hello, world!'});
    const component = mount(<Title store={store}/>);
    expect(component.text()).to.equal('Hello, world!');
  });
});
