document.addEventListener('DOMContentLoaded', function() {
  var dropBtn = document.getElementById('drop-btn');
  var dropContent = document.querySelector('.dropContent');
  var submitBox = document.getElementById('submit-box');
  var submitList = document.getElementById('submit-list');
  var modal = document.getElementById('modal');
  var modalContent = document.getElementById('modal-content');
  var modalClose = document.getElementById('modal-close');

  // 드롭다운 버튼 클릭 이벤트
  dropBtn.addEventListener('click', function() {
      dropContent.style.display = dropContent.style.display === 'block' ? 'none' : 'block';
  });

  // 윈도우 클릭 이벤트
  window.onclick = function(event) {
      if (!event.target.matches('#drop-btn')) {
          if (dropContent.style.display === 'block') {
              dropContent.style.display = 'none';
          }
      }

      // 모달 외부 클릭 시 모달 닫기
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  };

  // 드롭다운 항목 선택 이벤트
  window.selectItem = function(event, option) {
      event.preventDefault();
      dropBtn.value = option;
      dropContent.style.display = 'none';
  };

  // 제출 버튼 클릭 이벤트
  submitBox.addEventListener('submit', function(event) {
      event.preventDefault();

      var category = dropBtn.value;
      var title = document.getElementById('submit-title').value;
      var content = document.getElementById('submit-input').value;
      var currentTime = new Date().toLocaleString();

      // 게시글 추가
      var newItem = document.createElement('div');
      newItem.classList.add('submit-item');

      var newCategory = document.createElement('p');
      newCategory.classList.add('category');
      newCategory.textContent = category;

      var newTitle = document.createElement('p');
      newTitle.classList.add('title');
      newTitle.textContent = title;

      var newTime = document.createElement('p');
      newTime.classList.add('time');
      newTime.textContent = currentTime;

      newItem.appendChild(newCategory);
      newItem.appendChild(newTitle);
      newItem.appendChild(newTime);

      newItem.addEventListener('click', function() {
          modalContent.querySelector('h3').textContent = title;
          modalContent.querySelector('.modal-category').textContent = '카테고리 | ' + category;
          modalContent.querySelector('.modal-time').textContent = '작성시간 | ' + currentTime;
          modalContent.querySelector('.modal-content-text').textContent = content;
          modal.style.display = 'block';
      });

      submitList.appendChild(newItem);

      // 입력 폼 초기화
      dropBtn.value = '카테고리';
      document.getElementById('submit-title').value = '';
      document.getElementById('submit-input').value = '';
  });

  // 모달 닫기 이벤트
  modalClose.addEventListener('click', function() {
      modal.style.display = 'none';
  });
});