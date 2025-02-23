import RichTextEditor from "@/components/RichTextEditor";

const SelectedJournal = ({ params }) => {
  console.log(
    "%capp(UserDashboard)journal[id]page.jsx:2 id",
    "color: #007acc;",
    params.id
  );
  return (
    <>
      <p>helllo {params.id}</p>
      <RichTextEditor/>
    </>
  );
};
export default SelectedJournal;
