import React from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import './app.css';
import Habits from './components/habits';
import Navbar from './components/navbar';
import HabitPresenter from './habit_presenter';

//testing을 작성하기에 앞서..
//현재 코드의 문제점
//서비스 로직들이 react에 의존하고 있어, 만약 코드를 재사용하고 싶거나, 다른 라이브러리를 사용해서 어플리케이션을
//만들고 싶을 때 어렵다는 문제가 있다.
//또한 컴포넌트를 테스팅하는 라이브러리를 따로 사용해야만 테스트를 할 수 있다.
//=> 로직들을 class로 뽑아서, App내에서는 클래를 사용하고, jest를 이용해서 class를 테스트하면 된다.
const App = ({presenter}) => {
  const [habits, setHabits] = useState(presenter.getHabits());

  const handleIncrement = useCallback((habit) => {
    presenter.increment(habit, setHabits);
  }, []);

  const handleDecrement = useCallback((habit) => {
    presenter.decrement(habit, setHabits);
  }, []);

  const handleDelete = useCallback((habit) => {
    presenter.delete(habit, setHabits);
  }, []);

  const handleAdd = useCallback((name) => {
    presenter.add(name, setHabits);
  }, []);

  const handleReset = useCallback(() => {
    presenter.reset(setHabits);
  }, []);

  return (
    <>
      <Navbar totalCount={habits.filter((item) => item.count > 0).length} />
      <Habits
        habits={habits}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onReset={handleReset}
      />
    </>
  );
};

export default App;
