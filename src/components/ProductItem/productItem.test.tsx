import { fireEvent, render } from '@testing-library/react-native'
import ProductItem, { ProductItemProps } from '.';

const props: ProductItemProps = {
    expanded: false,
    name: 'Paracetamol',
    prices: [...new Array(4)]
        .map((_, idx) => ({ id: idx, date: new Date().toISOString(), price: 20 })),
    last: false,
    onDelete: () => console.log('onDelete triggered'),
    onEdit: () => console.log('onEdit triggered'),
    onPress: () => console.log('onPress triggered')
};

test('displays correct product name', () => {
    const { getByText } = render(<ProductItem {...props} />)

    expect(getByText(new RegExp(props.name, 'i'))).toBeTruthy();
})


test('displays correct product price', () => {
    const { getByText } = render(<ProductItem {...props} />)
    
    const latestPriceRegex = new RegExp(props.prices[props.prices.length - 1].price.toString(), 'i');
   
    expect(getByText(latestPriceRegex)).toBeTruthy();
})


test('all buttons work', () => {
    const { getByTestId } = render(<ProductItem {...props} />)

    const [listAccord, editBtn, deleteBtn] = [getByTestId('btn:onPress'), getByTestId('btn:onEdit'), getByTestId('btn:onDelete')];
    const logSpy = jest.spyOn(console, 'log');
    fireEvent.press(listAccord);
    fireEvent.press(editBtn);
    fireEvent.press(deleteBtn);

    expect(logSpy).toHaveBeenCalledTimes(3);
});

test('renders correctly', () => {
    const { toJSON } = render(<ProductItem {...props} />)

    expect(toJSON()).toMatchSnapshot();
});

test('displays a list of past prices when expand is true', () => {
    const { getAllByTestId } = render(<ProductItem {...props} expanded={true} />)

    const listItems = getAllByTestId('listItem');

    expect(listItems).toHaveLength(props.prices.length - 1);
});