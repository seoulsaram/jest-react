import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import HabitAddForm from '../habitAddForm';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe('HabitAddForm', () => {
  it('render', () => {
    //스냅샷 테스트
    const component = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('Form Submit', () => {
    let onAdd;
    let input;
    let button;

    beforeEach(() => {
      onAdd = jest.fn();
      render(<HabitAddForm onAdd={onAdd} />);
      input = screen.getByPlaceholderText('Habit');
      button = screen.getByText('Add');
    });

    it('calls onAdd when button is clicked and valid habit is entered', () => {
      //input에다가 원하는 습관의 이름을 타이핑한 다음에 (given)
      //add버튼을 클릭하면 (when)
      //onAdd가 input에 입력된 이름과 함께 호출되어야 함. (then)
      userEvent.type(input, 'New Habit');
      userEvent.click(button);

      expect(onAdd).toHaveBeenCalledWith('New Habit');
    });

    it('does not call onAdd when the habit is empty', () => {
      userEvent.type(input, '');
      userEvent.click(button);
      expect(onAdd).toHaveBeenCalledTimes(0);
    });
  });
});
