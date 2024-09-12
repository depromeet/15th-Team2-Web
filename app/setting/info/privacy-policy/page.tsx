'use client';

import { useRouter } from 'next/navigation';

import { BackButton, HeaderBar } from '@/components/molecules';
import { css } from '@/styled-system/css';

export default function Page() {
  const router = useRouter();
  return (
    <>
      <HeaderBar>
        <HeaderBar.LeftContent>
          <BackButton onClickBack={() => router.back()} />
        </HeaderBar.LeftContent>
      </HeaderBar>

      <article className={css({ px: '20px' })}>
        개인정보처리방침
        <br />
        <br />
        제1조(목적)
        <br />
        Swimie(이하 &apos;회사&apos;라고 함)는 회사가 제공하고자 하는
        서비스(이하 &apos;회사 서비스)를 이용하는 개인 (이하 이용자&apos; 또는
        &apos;개인&apos;)의 정보(이하 &apos;개인정보&apos;)를 보호하기 위해,
        개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하
        &apos;정보통신망법&apos; 등 관련 법령을 준수하고, 서비스 이용자의
        개인정보 보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기
        위하여 다음과 같이 개인정보처리방침(이하 &apos;본 방침)을 수립합니다.
        <br />
        <br />
        제2조(개인정보 처리의 원칙)
        <br />
        개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할
        수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게
        제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우
        회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게
        제공할 수도 있습니다.
        <br />
        <br />
        제3조(본 방침의 공개)
        <br />
        1. 회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사
        홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을 공개하고
        있습니다.
        <br />
        2. 회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을
        활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.
        <br />
        <br />
        제4조(본 방침의 변경)
        <br />
        1. 본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의
        정책이나 내용의 변경에 따라 개정될 수 있습니다.
        <br />
        2. 회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의
        방법으로 공지합니다.
        <br />
        가. 회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의
        창을 통하여 공지하는 방법
        <br />
        나. 서면·모사전송·전자우편 또는 이와 비슷한 방법으로 이용자에게 공지하는
        방법
        <br />
        3. 회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에
        공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일
        전에 공지합니다.
        <br />
        <br />
        제5조(회원 가입을 위한 정보)
        <br />
        회사는 이용자의 회사 서비스에 대한 회원가입을 위하여 다음과 같은 정보를
        수집합니다.
        <br />
        1. 필수 수집 정보: 이메일 주소, 비밀번호, 이름 및 닉네임
        <br />
        2. 선택 수집 정보: 프로필 사진
        <br />
        <br />
        제6조(서비스 이용 및 부정 이용 확인을 위한 정보)
        <br />
        회사는 이용자의 서비스 이용에 따른 통계·분석 및 부정이용의 확인·분석을
        위하여 다음과 같은 정보를 수집합니다. (부정이용이란 회원탈퇴 후 재가입,
        상품구매 후 구매취소 등을 반복적으로 행하는 등 회사가 제공하는 할인쿠폰,
        이벤트 혜택 등의 경제상 이익을 불·편법적으로 수취하는 행위, 이용약관
        등에서 금지하고 있는 행위, 명의도용 등의 불·편법행위 등을 말합니다.)
        <br />
        1. 필수 수집 정보: 기기정보
        <br />
        <br />
        제7조(기타 수집 정보)
        <br />
        회사는 아래와 같이 정보를 수집합니다.
        <br />
        1. 수집목적: 사용자가 제공하는 정보
        <br />
        2. 수집정보: 사용자가 수영 기록 작성 시 업로드한 본인의 수영 사진 및
        기록에 입력한 정보(예: 수영 시간, 거리, 장소, 느낌 등), 사용자가 프로필
        편집 시 업로드한 사진, 커뮤니티 기능 이용 시 작성한 게시물 및 댓글 등의
        콘텐츠
        <br />
        <br />
        제8조(개인정보 수집 방법)
        <br />
        회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.
        <br />
        1. 이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식
        <br />
        2. 어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해 이용자가
        자신의 개인정보를 입력하는 방식
        <br />
        3. 이용자가 고객센터의 상담, 게시판에서의 활동 등 회사의 서비스를
        이용하는 과정에서 이용자가 입력하는 방식
        <br />
        <br />
        제9조(개인정보의 이용)
        <br />
        회사는 개인정보를 다음 각 호의 경우에 이용합니다.
        <br />
        1. 공지사항의 전달 등 회사운영에 필요한 경우
        <br />
        2. 이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스 개선을 위한
        경우
        <br />
        3. 회사의 서비스를 제공하기 위한 경우
        <br />
        4. 법령 및 회사 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용
        행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및
        제재를 위한 경우
        <br />
        5. 인구통계학적 분석, 서비스 방문 및 이용기록의 분석을 위한 경우
        <br />
        <br />
        제10조(개인정보의 보유 및 이용기간)
        <br />
        1. 회사는 이용자의 개인정보에 대해 개인정보의 수집·이용 목적 달성을 위한
        기간 동안 개인정보를 보유 및 이용합니다.
        <br />
        2. 전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록은 부정
        가입 및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.
        <br />
        <br />
        제11조(법령에 따른 개인정보의 보유 및 이용기간)
        <br />
        회사는 관계법령에 따라 다음과 같이 개인정보를 보유 및 이용합니다.
        <br />
        1. 전자상거래 등에서의 소비자보호에 관한 법률에 따른 보유정보 및
        보유기간
        <br />
        가. 계약 또는 청약철회 등에 관한 기록 : 5년
        <br />
        나. 대금결제 및 재화 등의 공급에 관한 기록 : 5년
        <br />
        다. 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
        <br />
        라. 표시·광고에 관한 기록 : 6개월
        <br />
        2. 통신비밀보호법에 따른 보유정보 및 보유기간
        <br />
        가. 웹사이트 로그 기록 자료 : 3개월
        <br />
        3. 전자금융거래법에 따른 보유정보 및 보유기간
        <br />
        가. 전자금융거래에 관한 기록 : 5년
        <br />
        4. 위치정보의 보호 및 이용 등에 관한 법률
        <br />
        가. 개인위치정보에 관한 기록 : 6개월
        <br />
        <br />
        제12조(개인정보의 파기원칙)
        <br />
        회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성, 보유·이용기간의
        경과 등 개인정보가 필요하지 않을 경우에는 해당 정보를 지체 없이
        파기합니다.
        <br />
        <br />
        제13조(개인정보파기절차)
        <br />
        1. 이용자가 회원가입 등을 위해 입력한 정보는 개인정보 처리 목적이 달성된
        후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련
        법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된
        후 파기 되어집니다.
        <br />
        2. 회사는 파기 사유가 발생한 개인정보를 개인정보보호 책임자의 승인절차를
        거쳐 파기합니다.
        <br />
        <br />
        제14조(개인정보파기방법)
        <br />
        회사는 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적
        방법을 사용하여 삭제하며, 종이로 출력된 개인정보는 분쇄기로 분쇄하거나
        소각 등을 통하여 파기합니다.
        <br />
        <br />
        제15조(서비스의 해제·해지 및 탈퇴 절차)
        <br />
        1. 이용자가 이용 계약을 해지하고자 할 때는 언제든지 홈페이지 상의 이용자
        탈퇴 신청을 통해 이용계약 해지를 요청할 수 있습니다. 단, 신규가입 후
        일정 시간 동안 서비스 부정이용 방지 등의 사유로 즉시 탈퇴가 제한될 수
        있습니다.
        <br />
        2. 회사는 이용자가 본 약관에서 정한 이용자의 의무를 위반한 경우 등
        비정상적인 이용 또는 부당한 이용과 이용자 금지프로그램 사용하는 경우
        또는 타인의 명예를 훼손하거나 모욕하는 방송과 게시물을 작성한 경우
        이러한 행위를 금지하거나 삭제를 요청하였음에도 불구하고 최초의 금지 또는
        삭제 요청을 포함하여 2회 이상 누적되는 경우 이용자에게 통지하고, 계약을
        해지할 수 있습니다.
        <br />
        3. 회사는 이용자의 청약철회, 해제 또는 해지의 의사표시를 수신한 후 그
        사실을 이용자에게 회신합니다. 회신은 이용자가 회사에 대하여 통지한 방법
        중 하나에 의하고, 이용자가 회사에 대하여 통지한 연락처가 존재하지 않는
        경우에는 회신하지 않을 수 있습니다.
        <br />
        <br />
        제16조(손해배상)
        <br />
        1. 회사 또는 이용자는 상대방의 귀책에 따라 손해가 발생하는 경우
        손해배상을 청구할 수 있습니다. 다만, 회사는 무료서비스의 장애, 제공
        중단, 보관된 자료 멸실 또는 삭제, 변조 등으로 인한 손해에 대하여는
        배상책임을 부담하지 않습니다.
        <br />
        2. 회사가 제공하는 서비스의 이용과 관련하여 회사의 운영정책 및 개인정보
        보호정책, 기타 서비스별 이용약관에서 정하는 내용에 위반하지 않는 한
        회사는 어떠한 손해에 대하여도 책임을 부담하지 않습니다.
        <br />
        <br />
        제17조(면책사항)
        <br />
        1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할
        수 없는 경우에는 서비스 제공에 관한 책임을 지지 않습니다.
        <br />
        2. 회사는 이용자의 귀책사유로 인한 서비스 이용장애에 대하여 책임을 지지
        않습니다.
        <br />
        3. 회사는 이용자가 서비스를 이용하며 기대하는 수익을 얻지 못한 것에
        대하여 책임 지지 않으며 서비스를 통하여 얻은 자료로 인한 손해 등에
        대하여도 책임을 지지 않습니다.
        <br />
        4. 회사는 이용자가 웹페이지에 게재한 내용의 신뢰도, 정확성 등 내용에
        대해서는 책임지지 않으며, 이용자 상호간 또는 이용자와 제3자 상호간
        서비스를 매개로 발생한 분쟁에 개입하지 않습니다.
        <br />
        <br />
        제18조(정보의 제공 및 광고 게재)
        <br />
        1. 회사는 이용자가 서비스 이용 중 필요하다고 인정되는 각종 정보 및
        광고를 배너 게재, 전자우편(E-Mail), 휴대폰 메시지, 전화, 우편 등의
        방법으로 이용자에게 제공(또는 전송)할 수 있습니다. 다만, 이용자는 이를
        원하지 않을 경우 회사가 제공하는 방법에 따라 수신을 거부할 수 있습니다.
        <br />
        2. 이용자가 수신 거부를 한 경우에도 이용약관, 개인정보보호정책, 기타
        이용자의 이익에 영향을 미칠 수 있는 중요한 사항의 변경 등
        &apos;정보통신망이용촉진 및 정보보호 등에 관한 법률&apos;에서 정하는
        사유 등 이용자가 반드시 알고 있어야 하는 사항에 대하여는 전자우편 등의
        방법으로 정보를 제공할 수 있습니다.
        <br />
        3. 제1항 단서에 따라 이용자가 수신 거부 조치를 취한 경우 이로 인하여
        회사가 거래 관련 정보, 이용 문의에 대한 답변 등의 정보를 전달하지 못한
        경우 회사는 이로 인한 책임이 없습니다.
        <br />
        4. 회사는 &apos;정보통신망법&apos; 시행령에 따라 2년마다 영리 목적의
        광고 정보 전송에 대한 수신동의 여부를 확인합니다.
        <br />
        5. 회사는 광고주의 판촉 활동에 이용자가 참여하거나, 거래의 결과로서
        발생하는 손실 또는 손해에 대하여는 책임을 지지 않습니다.
        <br />
        <br />
        제19조(권리의 귀속)
        <br />
        1. 회사가 제공하는 서비스에 대한 저작권 등 지식재산권은 회사에 귀속
        됩니다.
        <br />
        2. 회사는 서비스와 관련하여 이용자에게 회사가 정한 조건 따라 회사가
        제공하는 서비스를 이용할 수 있는 권한만을 부여하며, 이용자는 이를 양도,
        판매, 담보제공 하는 등 처분행위를 할 수 없습니다.
        <br />
        3. 제1항의 규정에도 불구하고 이용자가 직접 작성한 콘텐츠 및 회사의
        제휴계약에 따라 제공된 저작물에 대한 지식재산권은 회사에 귀속되지
        않습니다.
        <br />
        <br />
        제20조(콘텐츠의 관리)
        <br />
        1. 회원이 작성 또는 창작한 콘텐츠가 &apos;개인정보보호법&apos; 및
        &apos;저작권법 등 관련 법에 위반되는 내용을 포함하는 경우, 관리자는 관련
        법이 정한 절차에 따라 해당 콘텐츠의 게시중단 및 삭제 등을 요청할 수
        있으며, 회사는 관련 법에 따라 조치를 취하여야 합니다.
        <br />
        2. 회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될
        만한 사유가 있거나 기타 회사 정책 및 관련 법에 위반되는 경우에는 관련
        법에 따라 해당 콘텐츠에 대해 임시조치 등을 취할 수 있습니다.
        <br />
        <br />
        제21조(관할법원 및 준거법)
        <br />
        서비스와 관련하여 분쟁이 발생한 경우 관할법원은 민사소송법에 따른
        관할법원으로 정하며, 준거법은 대한민국의 법령을 적용합니다.
        <br />
        <br />
        부칙
        <br />
        제1조 본 방침은 2024.09.01.부터 시행됩니다.
      </article>
    </>
  );
}