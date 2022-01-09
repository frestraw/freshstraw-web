import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createCard, editCard } from "../apis";
import Button from "../components/common/Button";
import DropDown from "../components/common/DropDown";
import Input from "../components/common/Input";
import MobileTemplate from "../components/common/MobileTemplate";
import RadioGroup from "../components/common/RadioGroup";
import { colors } from "../design-token";
import { ReactComponent as UploadIcon } from "../static/svg/uploadIcon.svg";

const Create = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [file, setFile] = useState<File>();
  const [value, setValue] = useState({
    name: "",
    gender: "",
    job: "",
    email: "",
    password: "",
    passwordConfirm: "",
    birthDate: "",
    likeFood: "",
    github: "",
    bio: "",
    mbti: "",
    likeSeason: "",
  });

  const {
    name,
    gender,
    job,
    email,
    password,
    passwordConfirm,
    bio,
    mbti,
    birthDate,
    github,
    likeFood,
    likeSeason,
  } = value;

  const isFullField =
    file &&
    name &&
    gender &&
    job &&
    email &&
    password &&
    password === passwordConfirm &&
    true;
  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [evt.target.name]: evt.target.value });
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.set("name", name);
    formData.set("gender", gender);
    formData.set("email", email);
    formData.set("profession", job);
    formData.set("password", password);
    file && formData.append("image", file);
    try {
      const { data } = await createCard(formData);
      await editCard(data.id, {
        name: name,
        gender: gender,
        email: email,
        profession: job,
        password: password,
        cardItems: [
          {
            itemId: 1,
            value: mbti,
          },
          {
            itemId: 3,
            value: bio,
          },
          {
            itemId: 4,
            value: likeSeason,
          },
          {
            itemId: 5,
            value: likeFood,
          },
          {
            itemId: 6,
            value: birthDate,
          },
          {
            itemId: 7,
            value: github,
          },
        ],
      });
      navigate(`/profile/${data.id}`);
      document.cookie = `myId=${data.id}; secure; SameSite=none`;
    } catch (e) {
      alert(e);
    }
  };

  return (
    <MobileTemplate>
      <CreateStyle>
        <div className="title">
          편리한 정보 공유를 위해
          <br /> 꼭 입력해주세요!
        </div>
        <div className="content">
          {page === 0 ? (
            <>
              <div className="profile-upload">
                <div className="left">
                  <div className="title">프로필 사진 업로드</div>
                  <div className="description">
                    사진이 없으면 기본 프로필로 등록되어요!
                  </div>
                </div>
                <label className="upload-button">
                  <input
                    type="file"
                    onChange={(e) =>
                      e.target.files && setFile(e.target.files[0])
                    }
                  ></input>
                  <UploadIcon />
                </label>
              </div>
              <Input
                value={name}
                title="이름"
                name="name"
                onChange={onChangeHandler}
              />
              <DropDown
                onChange={onChangeHandler as any}
                title="성별"
                name="gender"
                placeholder="성별을 선택하세요."
                items={["남", "여"]}
              ></DropDown>

              <Input
                value={job}
                title="직업"
                name="job"
                onChange={onChangeHandler}
              />
              <Input
                value={email}
                title="이메일"
                name="email"
                onChange={onChangeHandler}
              />
              <Input
                title="비밀번호"
                value={password}
                name="password"
                onChange={onChangeHandler}
              ></Input>
              <Input
                title="비밀번호 확인"
                value={passwordConfirm}
                name="passwordConfirm"
                onChange={onChangeHandler}
              ></Input>
            </>
          ) : (
            <>
              <Input
                title="한 줄 소개"
                value={bio}
                name="bio"
                onChange={onChangeHandler}
              />
              <Input
                title="생년월일"
                value={birthDate}
                name="birthDate"
                onChange={onChangeHandler}
              />
              <Input
                value={github}
                title="깃허브"
                name="github"
                onChange={onChangeHandler}
              />
              <DropDown
                onChange={onChangeHandler as any}
                title="MBTI"
                placeholder="MBTI를 선택해주세요."
                name="mbti"
                items={[
                  "ISTJ",
                  "ISFT",
                  "INFJ",
                  "INTJ",
                  "ISTP",
                  "ISFP",
                  "INFP",
                  "INTP",
                  "ESTP",
                  "ESFP",
                  "ENFP",
                  "ENTP",
                  "ESTJ",
                  "ESFJ",
                  "ENFJ",
                  "ENTJ",
                ]}
              ></DropDown>
              <RadioGroup
                title="좋아하는 음식"
                items={["한식", "중식", "일식", "양식"]}
                name="likeFood"
                onChange={onChangeHandler as any}
              />

              <RadioGroup
                title="좋아하는 계절"
                items={["봄", "여름", "가을", "겨울"]}
                name="likeSeason"
                onChange={onChangeHandler as any}
              />
            </>
          )}
        </div>
        <div className="bottomButton">
          <Button
            onClick={() => (page === 1 ? onSubmit() : setPage(1))}
            disabled={!(isFullField || false)}
          >
            {page === 0 ? "다음 내용을 입력하기" : "프로필 작성 마치기"}
          </Button>
        </div>
      </CreateStyle>
    </MobileTemplate>
  );
};

export default Create;

const CreateStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  & .bottomButton {
    position: fixed;
    bottom: 0;
    max-width: 710px;
    width: 100%;
    padding: 0 28px;
    padding-bottom: 28px;
    box-sizing: border-box;
    background-color: white;
  }
  & .profile-upload {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .left {
      & > .title {
        color: ${colors.title};
        font-weight: 700;
        font-size: 16px;
      }
      & > .description {
        color: ${colors.description};
        font-weight: 40;
        font-size: 12px;
      }
    }
    & .upload-button {
      & input {
        display: none;
      }
      width: 44px;
      height: 44px;
      background-color: ${colors.icon};
      border: none;
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  & > .title {
    color: ${colors.title};
    font-weight: 700;
    font-size: 20px;
    padding: 32px 28px;
  }
  & .content {
    padding: 0 28px;
    padding-top: 40px;
    padding-bottom: 112px;
    flex: 1;
    background-color: white;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
`;
