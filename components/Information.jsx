import Card from "./Card";

const Information = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h3 className="text-left mt-5 leading-[1.15] ">
        <span className="blue_gradient">{name} Profile</span>
      </h3>
      <p className="limp text-left">{desc}</p>
      <div className="prompt_layout mt-10 ">
        {data.length > 0 ? (
          data.map((post) => (
            <Card
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        ) : (
          <p className="limp">No posts available. Please check back later.</p>
        )}
      </div>
    </section>
  );
};

export default Information;
