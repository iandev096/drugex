import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-native-paper";
import RemoveProductModal, { RemoveProductModalProps } from ".";

const props: RemoveProductModalProps = {
    product: { id: 1, name: 'Aracetal 50mg' },
    visible: false,
    onDismiss: () => console.log('onDismiss triggered'),
    onRemove: () => console.log('onRemove triggered')
}

const Component = (props: RemoveProductModalProps) => (
    <Provider>
        <RemoveProductModal {...props} />
    </Provider>
)

test('should render nothing when visible is false', () => {
    const { queryByText } = render(<Component {...props} />);
   
    expect(queryByText(new RegExp(props.product!.name, 'i'))).toBeNull();
});

test('should render modal when visible is true', async () => {
    const { findByText } = render(<Component {...props} visible={true} />);
    
    const productNameRegex = new RegExp(props.product!.name, 'i');
    
    expect((await findByText(productNameRegex))).toBeTruthy();
});


test('renders correctly', () => {
    const { toJSON } = render(<Component {...props} />);

    expect(toJSON()).toMatchSnapshot();
});

test('all buttons work', async () => {
    const { findByTestId, getByTestId } = render(<Component {...props} visible={true} />);
    
    const cancelButton = await findByTestId('btn:onDismiss');
    const deleteButton = getByTestId('btn:onRemove');
    const logSpy = jest.spyOn(console, 'log');
    fireEvent.press(cancelButton);
    fireEvent.press(deleteButton);

    expect(logSpy).toHaveBeenCalledTimes(2);
});


test('renders correctly', () => {
    const { toJSON } = render(<Component {...props} visible={true} />);

    expect(toJSON()).toMatchSnapshot();
});