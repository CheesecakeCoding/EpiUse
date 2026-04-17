const App = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [refresh, setRefresh] = useState(false);

  // Retrieve all the items
  useEffect(() => {
    fetch("/api/grocery-list")
      .then((data) => data.json())
      .then(({ items }) => setItems(items));
  }, [refresh]);

  // Adds a new item
  const handleAdd = (event) => {
    event.preventDefault();

    fetch("/api/grocery-list", {
      method: "POST",
      body: JSON.stringify({ title }),
    }).then(() => {
      setRefresh(!refresh);
      setTitle("");
    });
  };

  // Mark an item as done
  const handleMarkAsDone = (item) => {
    if (item.isDone) {
      return;
    }

    fetch(`/api/grocery-list/${item.id}/done`, {
      method: "PUT",
    }).then(() => {
      setRefresh(!refresh);
    });
  };

  // Deletes an item
  const handleDelete = (item) => {
    fetch(`/api/grocery-list/${item.id}`, {
      method: "DELETE",
    }).then(() => {
      setRefresh(!refresh);
    });
  };

  return (
    <>
      <form onSubmit={handleAdd}>
        <input
          required
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => handleMarkAsDone(item)}
              />
              {item.title}
            </label>
            <button onClick={() => handleDelete(item)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};
